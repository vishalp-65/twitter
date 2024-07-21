export const types = `#graphql

    input LikeData {
        tweetId: String
        commentId: String
    }

    input UnlikeData {
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
