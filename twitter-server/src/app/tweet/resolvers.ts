import { Tweet } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GraphqlContext } from "../../intefaces";
import UserService from "../../services/user";
import TweetService, { CreateTweetPayload } from "../../services/tweet";
import LikeService from "../../services/like";
import CommentService from "../../services/comment";

const s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
});

const queries = {
    getAllTweets: async (parent: any, args: any, ctx: GraphqlContext) => {
        if (!ctx.user) {
            throw new Error("Unauthenticated");
        }

        const tweets = await TweetService.getAllTweets();

        // Fetch the likes, user's like status, and comments
        const tweetIds = tweets.map((tweet: Tweet) => tweet.id);
        const [likesCount, userLikes, commentsData] = await Promise.all([
            LikeService.getLikesCountForTweets(tweetIds),
            LikeService.getUserLikes(ctx.user.id, tweetIds),
            CommentService.getCommentsDataForTweets(tweetIds),
        ]);

        return tweets.map((tweet: Tweet) => ({
            ...tweet,
            totalLikes: likesCount[tweet.id] || 0,
            isLikedByCurrentUser: userLikes.includes(tweet.id),
            totalComments: commentsData.commentCounts[tweet.id] || 0,
            latestComment: commentsData.latestComments[tweet.id] || null,
        }));
    },
    getSignedURLForTweet: async (
        parent: any,
        { imageType, imageName }: { imageType: string; imageName: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");
        const allowedImageTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedImageTypes.includes(imageType))
            throw new Error("Unsupported Image Type");

        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            ContentType: imageType,
            Key: `uploads/${ctx.user.id}/tweets/${imageName}-${Date.now()}`,
        });

        const signedURL = await getSignedUrl(s3Client, putObjectCommand);

        console.log("image URL", signedURL);

        return signedURL;
    },
};

const mutations = {
    createTweet: async (
        parent: any,
        { payload }: { payload: CreateTweetPayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        const tweet = await TweetService.createTweet({
            ...payload,
            userId: ctx.user.id,
        });

        return tweet;
    },
};

const extraResolvers = {
    Tweet: {
        author: (parent: Tweet) => UserService.getUserById(parent.authorId),
    },
};

export const resolvers = { mutations, extraResolvers, queries };
