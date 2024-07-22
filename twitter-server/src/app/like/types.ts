export const types = `#graphql

    type ToggleLikeResponse {
        isLiked: Boolean!
        likeCount: Int!
    }

    input ToggleLikePayload {
        tweetId: String
        commentId: String
    }

    type Like {
        id: ID!
        createdAt: String

        user: User
        tweet: Tweet
        comment: Comment
    }
`;
