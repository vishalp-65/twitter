export const types = `#graphql

    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String

        followers: [User]
        following: [User]
        followerCount:Int
        followingCount:Int

        recommendedUsers: [User]

        tweets: [Tweet]
    }

`;
