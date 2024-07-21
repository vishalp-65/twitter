export const queries = `#graphql
    getLikesByTweet(tweetId: String!): [Like]
    getLikesByComment(commentId: String!): [Like]
    getLikesByUser(userId: String!): [Like]
`;
