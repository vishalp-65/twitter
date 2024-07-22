export const queries = `#graphql
    verifyGoogleToken(token: String!): String
    getCurrentUser: User

    getUserById(id: ID!): User
    getSignedURLForUserProfile(imageName: String!, imageType: String!): String
`;
