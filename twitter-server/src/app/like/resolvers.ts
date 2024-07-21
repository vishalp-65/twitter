import { Like } from "@prisma/client";
import UserService from "../../services/user";
import TweetService from "../../services/tweet";
import { GraphqlContext } from "../../intefaces";
import LikeService, { LikePayload, UnlikePayload } from "../../services/like";
import CommentService from "../../services/comment";
const queries = {
    getLikesByTweet: (parent: any, { tweetId }: { tweetId: string }) =>
        LikeService.getLikesByTweet(tweetId),
    getLikesByComment: (parent: any, { commentId }: { commentId: string }) =>
        LikeService.getLikesByComment(commentId),
    getLikesByUser: (parent: any, { userId }: { userId: string }) =>
        LikeService.getLikesByUser(userId),
};

const mutations = {
    likeTweetOrComment: async (
        parent: any,
        { payload }: { payload: LikePayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        return await LikeService.likeTweetOrComment({
            ...payload,
            userId: ctx.user.id,
        });
    },
    unlikeTweetOrComment: async (
        parent: any,
        { payload }: { payload: UnlikePayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        return await LikeService.unlikeTweetOrComment({
            ...payload,
            userId: ctx.user.id,
        });
    },
};

const extraResolvers = {
    Like: {
        user: (parent: Like) => UserService.getUserById(parent.userId),
        tweet: (parent: Like) =>
            parent.tweetId ? TweetService.getTweetById(parent.tweetId) : null,
        comment: (parent: Like) =>
            parent.commentId
                ? CommentService.getCommentById(parent.commentId)
                : null,
    },
};

export const resolvers = { queries, mutations, extraResolvers };
