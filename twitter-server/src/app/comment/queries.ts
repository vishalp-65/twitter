export const queries = `#graphql
    getCommentsByTweet(tweetId: String!): [Comment]
    getCommentsByUser(userId: String!): [Comment]
`;
