import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";

export interface CreateCommentPayload {
    content: string;
    tweetId?: string;
    parentId?: string;
    userId: string;
}

export interface DeleteCommentPayload {
    commentId: string;
}

class CommentService {
    public static async createComment(data: CreateCommentPayload) {
        const rateLimitFlag = await redisClient.get(
            `RATE_LIMIT:COMMENT:${data.userId}`
        );
        if (rateLimitFlag) throw new Error("Please wait....");

        const comment = await prismaClient.comment.create({
            data: {
                content: data.content,
                tweet: data.tweetId
                    ? { connect: { id: data.tweetId } }
                    : undefined,
                parent: data.parentId
                    ? { connect: { id: data.parentId } }
                    : undefined,
                author: { connect: { id: data.userId } },
            },
        });

        await redisClient.setex(`RATE_LIMIT:COMMENT:${data.userId}`, 10, 1);
        await redisClient.del(`COMMENTS:${data.tweetId}`);
        return comment;
    }

    public static async getCommentsByTweet(tweetId: string) {
        const cachedComments = await redisClient.get(`COMMENTS:${tweetId}`);
        if (cachedComments) return JSON.parse(cachedComments);

        const comments = await prismaClient.comment.findMany({
            where: { tweetId },
            orderBy: { createdAt: "desc" },
        });
        await redisClient.set(`COMMENTS:${tweetId}`, JSON.stringify(comments));
        return comments;
    }

    public static async getCommentsByUser(userId: string) {
        return prismaClient.comment.findMany({
            where: { authorId: userId },
            orderBy: { createdAt: "desc" },
        });
    }

    public static async getCommentById(id: string) {
        return prismaClient.comment.findUnique({ where: { id } });
    }

    public static async getReplies(parentId: string) {
        return prismaClient.comment.findMany({
            where: { parentId },
            orderBy: { createdAt: "desc" },
        });
    }

    public static async deleteComment(commentId: string, userId: string) {
        const comment = await prismaClient.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment || comment.authorId !== userId) {
            throw new Error("You are not authorized to delete this comment");
        }

        return prismaClient.comment.delete({ where: { id: commentId } });
    }
}

export default CommentService;
