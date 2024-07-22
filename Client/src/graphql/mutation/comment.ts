import { graphql } from "../../../gql";

export const createTweetMutation = graphql(`
    #graphql
    mutation createCommentMutation($payload: CreateCommentData!) {
        createComment(payload: $payload) {
            id
        }
    }
    mutation deleteCommentMutation($payload: DeleteCommentData!) {
        deleteComment(payload: $payload) {
            id
        }
    }
`);
