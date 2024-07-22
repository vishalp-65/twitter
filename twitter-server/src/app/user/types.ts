export const types = `#graphql

    input CreateUserInput{
        firstName:String!
        lastName: String!
        email : String!
        password: String!
        profileImageURL: String
    }

    input LoginUserInput{
        email: String!
        password: String!
    }

    type TokenResponse{
        token: String!
    }

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
