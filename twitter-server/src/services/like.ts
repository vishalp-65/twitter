import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";

export interface LikePayload {
    tweetId?: string;
    commentId?: string;
    userId: string;
}

export interface UnlikePayload {
    tweetId?: string;
    commentId?: string;
    userId: string;
}

class LikeService {
    public static async likeTweetOrComment(data: LikePayload) {
        const rateLimitFlag = await redisClient.get(
            `RATE_LIMIT:LIKE:${data.userId}`
        );
        if (rateLimitFlag) throw new Error("Please wait....");

        const like = await prismaClient.like.create({
            data: {
                user: { connect: { id: data.userId } },
                tweet: data.tweetId
                    ? { connect: { id: data.tweetId } }
                    : undefined,
                comment: data.commentId
                    ? { connect: { id: data.commentId } }
                    : undefined,
            },
        });

        await redisClient.setex(`RATE_LIMIT:LIKE:${data.userId}`, 10, 1);
        await redisClient.del(`LIKES:${data.tweetId || data.commentId}`);
        return like;
    }

    public static async unlikeTweetOrComment(data: UnlikePayload) {
        const like = await prismaClient.like.findFirst({
            where: {
                tweetId: data.tweetId,
                commentId: data.commentId,
                userId: data.userId,
            },
        });

        if (!like) {
            throw new Error("Like not found");
        }

        return prismaClient.like.delete({
            where: { id: like.id },
        });
    }

    public static async getLikesByTweet(tweetId: string) {
        const cachedLikes = await redisClient.get(`LIKES:${tweetId}`);
        if (cachedLikes) return JSON.parse(cachedLikes);

        const likes = await prismaClient.like.findMany({
            where: { tweetId },
            orderBy: { createdAt: "desc" },
        });
        await redisClient.set(`LIKES:${tweetId}`, JSON.stringify(likes));
        return likes;
    }

    public static async getLikesByComment(commentId: string) {
        const cachedLikes = await redisClient.get(`LIKES:${commentId}`);
        if (cachedLikes) return JSON.parse(cachedLikes);

        const likes = await prismaClient.like.findMany({
            where: { commentId },
            orderBy: { createdAt: "desc" },
        });
        await redisClient.set(`LIKES:${commentId}`, JSON.stringify(likes));
        return likes;
    }

    public static async getLikesByUser(userId: string) {
        return prismaClient.like.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }

    public static async getLikesCountForTweets(tweetIds: string[]) {
        const likes = await prismaClient.like.groupBy({
            by: ["tweetId"],
            where: { tweetId: { in: tweetIds } },
            _count: { tweetId: true },
        });

        return likes.reduce((acc: { [key: string]: number }, like) => {
            acc[like?.tweetId!] = like._count.tweetId;
            return acc;
        }, {});
    }

    public static async getUserLikes(userId: string, tweetIds: string[]) {
        const userLikes = await prismaClient.like.findMany({
            where: {
                userId: userId,
                tweetId: { in: tweetIds },
            },
            select: {
                tweetId: true,
            },
        });

        return userLikes.map((like) => like.tweetId);
    }
}

export default LikeService;
