export const types = `#graphql

    input CreateCommentData {
        content: String!
        tweetId: String
        parentId: String
    }

    input DeleteCommentData {
        commentId: String!
    }

    type Comment {
        id: ID!
        content: String!
        createdAt: String
        updatedAt: String

        author: User
        tweet: Tweet
        parent: Comment
        replies: [Comment]
    }
`;
