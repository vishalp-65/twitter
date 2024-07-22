export const mutations = `#graphql
    followUser(to: ID!): Boolean
    unfollowUser(to: ID!): Boolean
    createUser(payload : CreateUserInput!): TokenResponse
    loginUser(payload: LoginUserInput!) : TokenResponse 
`;
