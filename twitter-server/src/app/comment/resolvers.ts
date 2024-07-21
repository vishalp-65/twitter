import { Comment } from "@prisma/client";
import UserService from "../../services/user";
import TweetService from "../../services/tweet";
import { GraphqlContext } from "../../intefaces";
import CommentService, {
    CreateCommentPayload,
    DeleteCommentPayload,
} from "../../services/comment";

const queries = {
    getCommentsByTweet: (parent: any, { tweetId }: { tweetId: string }) =>
        CommentService.getCommentsByTweet(tweetId),
    getCommentsByUser: (parent: any, { userId }: { userId: string }) =>
        CommentService.getCommentsByUser(userId),
};

const mutations = {
    createComment: async (
        parent: any,
        { payload }: { payload: CreateCommentPayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        return await CommentService.createComment({
            ...payload,
            userId: ctx.user.id,
        });
    },
    deleteComment: async (
        parent: any,
        { payload }: { payload: DeleteCommentPayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        return await CommentService.deleteComment(
            payload.commentId,
            ctx.user.id
        );
    },
};

const extraResolvers = {
    Comment: {
        author: (parent: Comment) => UserService.getUserById(parent.authorId),
        tweet: (parent: Comment) => TweetService.getTweetById(parent.tweetId!),
        parent: (parent: Comment) =>
            CommentService.getCommentById(parent.parentId!),
        replies: (parent: Comment) => CommentService.getReplies(parent.id),
    },
};

export const resolvers = { queries, mutations, extraResolvers };
