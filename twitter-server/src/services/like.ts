import { Like } from "@prisma/client";
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
    public static async toggleLikeTweetOrComment(payload: Like) {
        const { userId, tweetId, commentId } = payload;

        // Check if already liked
        const existingLike = await prismaClient.like.findFirst({
            where: {
                userId,
                tweetId,
                commentId,
            },
        });

        let isLiked;
        if (existingLike) {
            // If already liked, unlike it
            await prismaClient.like.delete({
                where: { id: existingLike.id },
            });
            isLiked = false;
        } else {
            // If not liked yet, like it
            await prismaClient.like.create({
                data: {
                    userId,
                    tweetId,
                    commentId,
                },
            });
            isLiked = true;
        }

        // Get the updated like count
        let likeCount = 0;
        if (tweetId) {
            likeCount = await prismaClient.like.count({ where: { tweetId } });
        } else if (commentId) {
            likeCount = await prismaClient.like.count({ where: { commentId } });
        }

        return { isLiked, likeCount: likeCount || 0 };
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
