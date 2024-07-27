export const queries = `#graphql
    getAllTweets: [Tweet]
    getTweetByID(tweetID: String!): Tweet
    getSignedURLForTweet(imageName: String!, imageType: String!): String
`;
