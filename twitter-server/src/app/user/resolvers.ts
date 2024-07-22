import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../intefaces";
import { Tweet, User } from "@prisma/client";
import UserService, { createUserData } from "../../services/user";
import { redisClient } from "../../clients/redis";
import LikeService from "../../services/like";
import CommentService from "../../services/comment";

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const resultToken = await UserService.verifyGoogleAuthToken(token);
        return resultToken;
    },
    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx.user?.id;
        if (!id) return null;

        const user = await UserService.getUserById(id);
        return user;
    },
    getUserById: async (
        parent: any,
        { id }: { id: string },
        ctx: GraphqlContext
    ) => UserService.getUserById(id),
};

const extraResolvers = {
    User: {
        tweets: async (parent: User) => {
            const tweets = await prismaClient.tweet.findMany({
                where: { author: { id: parent.id } },
                orderBy: { createdAt: "desc" },
            });
            const tweetIds = tweets.map((tweet: Tweet) => tweet.id);
            const [likesCount, userLikes, commentsData] = await Promise.all([
                LikeService.getLikesCountForTweets(tweetIds),
                LikeService.getUserLikes(parent.id!, tweetIds),
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
        followers: async (parent: User) => {
            const result = await prismaClient.follows.findMany({
                where: { following: { id: parent.id } },
                include: {
                    follower: true,
                },
            });
            return result.map((el) => el.follower);
        },
        following: async (parent: User) => {
            const result = await prismaClient.follows.findMany({
                where: { follower: { id: parent.id } },
                include: {
                    following: true,
                },
            });
            return result.map((el) => el.following);
        },
        followerCount: async (
            parent: any,
            { id }: { id: string },
            ctx: GraphqlContext
        ) => UserService.followerCount(id),

        followingCount: async (
            parent: any,
            { id }: { id: string },
            ctx: GraphqlContext
        ) => UserService.followingCount(id),

        recommendedUsers: async (parent: User, _: any, ctx: GraphqlContext) => {
            if (!ctx.user) return [];
            const cachedValue = await redisClient.get(
                `RECOMMENDED_USERS:${ctx.user.id}`
            );

            if (cachedValue) {
                console.log("Cache Found");
                return JSON.parse(cachedValue);
            }

            const myFollowings = await prismaClient.follows.findMany({
                where: {
                    follower: { id: ctx.user.id },
                },
                include: {
                    following: {
                        include: {
                            followers: { include: { following: true } },
                        },
                    },
                },
            });

            const users: User[] = [];

            for (const followings of myFollowings) {
                for (const followingOfFollowedUser of followings.following
                    .followers) {
                    if (
                        followingOfFollowedUser.following.id !== ctx.user.id &&
                        myFollowings.findIndex(
                            (e) =>
                                e?.followingId ===
                                followingOfFollowedUser.following.id
                        ) < 0
                    ) {
                        users.push(followingOfFollowedUser.following);
                    }
                }
            }

            console.log("Cache Not Found");
            await redisClient.set(
                `RECOMMENDED_USERS:${ctx.user.id}`,
                JSON.stringify(users)
            );

            return users;
        },
    },
};

const mutations = {
    createUser: async (
        parent: any,
        { payload }: { payload: createUserData },
        ctx: GraphqlContext
    ) => {
        return await UserService.createUser(payload);
    },
    loginUser: async (
        parent: any,
        { payload }: { payload: createUserData },
        ctx: GraphqlContext
    ) => {
        return await UserService.loginUser(payload);
    },
    followUser: async (
        parent: any,
        { to }: { to: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");

        await UserService.followUser(ctx.user.id, to);
        await redisClient.del(`RECOMMENDED_USERS:${ctx.user.id}`);
        return true;
    },
    unfollowUser: async (
        parent: any,
        { to }: { to: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");
        await UserService.unfollowUser(ctx.user.id, to);
        await redisClient.del(`RECOMMENDED_USERS:${ctx.user.id}`);
        return true;
    },
};

export const resolvers = { queries, extraResolvers, mutations };
