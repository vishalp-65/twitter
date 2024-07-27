/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    #graphql\n    mutation createCommentMutation($payload: CreateCommentData!) {\n        createComment(payload: $payload) {\n            id\n        }\n    }\n    mutation deleteCommentMutation($payload: DeleteCommentData!) {\n        deleteComment(payload: $payload) {\n            id\n        }\n    }\n": types.CreateCommentMutationDocument,
    "\n    #graphql\n    mutation ToggleLikeTweetOrComment($payload: ToggleLikePayload!) {\n        toggleLikeTweetOrComment(payload: $payload) {\n            isLiked\n            likeCount\n        }\n    }\n": types.ToggleLikeTweetOrCommentDocument,
    "\n    #graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }\n": types.CreateTweetDocument,
    "\n    #graphql\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n": types.FollowUserDocument,
    "\n    #graphql\n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n": types.UnfollowUserDocument,
    "\n    #graphql\n    mutation CreateUser($payload: CreateUserInput!) {\n        createUser(payload: $payload) {\n            token\n        }\n    }\n": types.CreateUserDocument,
    "\n    #graphql\n    mutation LoginUser($payload: LoginUserInput!) {\n        loginUser(payload: $payload) {\n            token\n        }\n    }\n": types.LoginUserDocument,
    "\n    #graphql\n\n    query getCommentsByTweet($tweetId: String!) {\n        getCommentsByTweet(tweetId: $tweetId) {\n            createdAt\n            content\n            id\n            replies {\n                content\n                author {\n                    firstName\n                    id\n                    profileImageURL\n                    lastName\n                }\n                createdAt\n                id\n            }\n            author {\n                firstName\n                profileImageURL\n                lastName\n                id\n            }\n        }\n    }\n": types.GetCommentsByTweetDocument,
    "\n    #graphql\n\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            totalLikes\n            createdAt\n            updatedAt\n            isLikedByCurrentUser\n            totalComments\n            latestComment {\n                author {\n                    firstName\n                    lastName\n                    profileImageURL\n                    id\n                }\n                content\n                id\n                createdAt\n            }\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n        }\n    }\n": types.GetAllTweetsDocument,
    "\n    #graphql\n\n    query GetTweetByID($tweetId: String!) {\n        getTweetByID(tweetID: $tweetId) {\n            id\n            imageURL\n            content\n            createdAt\n            isLikedByCurrentUser\n            totalComments\n            totalLikes\n            author {\n                firstName\n                id\n                lastName\n                profileImageURL\n            }\n        }\n    }\n": types.GetTweetByIdDocument,
    "\n    query GetSignedURL($imageName: String!, $imageType: String!) {\n        getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n    }\n": types.GetSignedUrlDocument,
    "\n    #graphql\n    query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n": types.VerifyUserGoogleTokenDocument,
    "\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            profileImageURL\n            email\n            firstName\n            lastName\n            recommendedUsers {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            followers {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                id\n                content\n                author {\n                    id\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n": types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetuserById($id: ID!) {\n        getUserById(id: $id) {\n            id\n            email\n            firstName\n            lastName\n            profileImageURL\n            followerCount\n            followingCount\n            following {\n                firstName\n                id\n                lastName\n                profileImageURL\n            }\n            followers {\n                firstName\n                lastName\n                id\n                profileImageURL\n            }\n            tweets {\n                content\n                id\n                imageURL\n                createdAt\n                totalLikes\n                isLikedByCurrentUser\n                totalComments\n                author {\n                    id\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n": types.GetuserByIdDocument,
    "\n    query Query($imageName: String!, $imageType: String!) {\n        getSignedURLForUserProfile(imageName: $imageName, imageType: $imageType)\n    }\n": types.QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation createCommentMutation($payload: CreateCommentData!) {\n        createComment(payload: $payload) {\n            id\n        }\n    }\n    mutation deleteCommentMutation($payload: DeleteCommentData!) {\n        deleteComment(payload: $payload) {\n            id\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation createCommentMutation($payload: CreateCommentData!) {\n        createComment(payload: $payload) {\n            id\n        }\n    }\n    mutation deleteCommentMutation($payload: DeleteCommentData!) {\n        deleteComment(payload: $payload) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation ToggleLikeTweetOrComment($payload: ToggleLikePayload!) {\n        toggleLikeTweetOrComment(payload: $payload) {\n            isLiked\n            likeCount\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation ToggleLikeTweetOrComment($payload: ToggleLikePayload!) {\n        toggleLikeTweetOrComment(payload: $payload) {\n            isLiked\n            likeCount\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateUser($payload: CreateUserInput!) {\n        createUser(payload: $payload) {\n            token\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation CreateUser($payload: CreateUserInput!) {\n        createUser(payload: $payload) {\n            token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation LoginUser($payload: LoginUserInput!) {\n        loginUser(payload: $payload) {\n            token\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation LoginUser($payload: LoginUserInput!) {\n        loginUser(payload: $payload) {\n            token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n\n    query getCommentsByTweet($tweetId: String!) {\n        getCommentsByTweet(tweetId: $tweetId) {\n            createdAt\n            content\n            id\n            replies {\n                content\n                author {\n                    firstName\n                    id\n                    profileImageURL\n                    lastName\n                }\n                createdAt\n                id\n            }\n            author {\n                firstName\n                profileImageURL\n                lastName\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n\n    query getCommentsByTweet($tweetId: String!) {\n        getCommentsByTweet(tweetId: $tweetId) {\n            createdAt\n            content\n            id\n            replies {\n                content\n                author {\n                    firstName\n                    id\n                    profileImageURL\n                    lastName\n                }\n                createdAt\n                id\n            }\n            author {\n                firstName\n                profileImageURL\n                lastName\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            totalLikes\n            createdAt\n            updatedAt\n            isLikedByCurrentUser\n            totalComments\n            latestComment {\n                author {\n                    firstName\n                    lastName\n                    profileImageURL\n                    id\n                }\n                content\n                id\n                createdAt\n            }\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            totalLikes\n            createdAt\n            updatedAt\n            isLikedByCurrentUser\n            totalComments\n            latestComment {\n                author {\n                    firstName\n                    lastName\n                    profileImageURL\n                    id\n                }\n                content\n                id\n                createdAt\n            }\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n\n    query GetTweetByID($tweetId: String!) {\n        getTweetByID(tweetID: $tweetId) {\n            id\n            imageURL\n            content\n            createdAt\n            isLikedByCurrentUser\n            totalComments\n            totalLikes\n            author {\n                firstName\n                id\n                lastName\n                profileImageURL\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n\n    query GetTweetByID($tweetId: String!) {\n        getTweetByID(tweetID: $tweetId) {\n            id\n            imageURL\n            content\n            createdAt\n            isLikedByCurrentUser\n            totalComments\n            totalLikes\n            author {\n                firstName\n                id\n                lastName\n                profileImageURL\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSignedURL($imageName: String!, $imageType: String!) {\n        getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n    }\n"): (typeof documents)["\n    query GetSignedURL($imageName: String!, $imageType: String!) {\n        getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n"): (typeof documents)["\n    #graphql\n    query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            profileImageURL\n            email\n            firstName\n            lastName\n            recommendedUsers {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            followers {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                id\n                content\n                author {\n                    id\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            profileImageURL\n            email\n            firstName\n            lastName\n            recommendedUsers {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            followers {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            following {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n            tweets {\n                id\n                content\n                author {\n                    id\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetuserById($id: ID!) {\n        getUserById(id: $id) {\n            id\n            email\n            firstName\n            lastName\n            profileImageURL\n            followerCount\n            followingCount\n            following {\n                firstName\n                id\n                lastName\n                profileImageURL\n            }\n            followers {\n                firstName\n                lastName\n                id\n                profileImageURL\n            }\n            tweets {\n                content\n                id\n                imageURL\n                createdAt\n                totalLikes\n                isLikedByCurrentUser\n                totalComments\n                author {\n                    id\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetuserById($id: ID!) {\n        getUserById(id: $id) {\n            id\n            email\n            firstName\n            lastName\n            profileImageURL\n            followerCount\n            followingCount\n            following {\n                firstName\n                id\n                lastName\n                profileImageURL\n            }\n            followers {\n                firstName\n                lastName\n                id\n                profileImageURL\n            }\n            tweets {\n                content\n                id\n                imageURL\n                createdAt\n                totalLikes\n                isLikedByCurrentUser\n                totalComments\n                author {\n                    id\n                    firstName\n                    lastName\n                    profileImageURL\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Query($imageName: String!, $imageType: String!) {\n        getSignedURLForUserProfile(imageName: $imageName, imageType: $imageType)\n    }\n"): (typeof documents)["\n    query Query($imageName: String!, $imageType: String!) {\n        getSignedURLForUserProfile(imageName: $imageName, imageType: $imageType)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;