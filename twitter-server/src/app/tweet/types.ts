export const types = `#graphql

    input CreateTweetData {
        content: String!
        imageURL: String
    }

    type Tweet {
        id: ID!
        content: String!
        imageURL: String
        createdAt: String
        updatedAt: String
        
        author: User
        totalLikes: Int
        isLikedByCurrentUser: Boolean
        totalComments: Int
        latestComment: Comment
    }
`;
