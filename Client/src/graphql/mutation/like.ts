import { graphql } from "../../../gql";

export const createTweetMutation = graphql(`
    #graphql
    mutation likeMutation($payload: LikeData!) {
        likeTweetOrComment(payload: $payload) {
            id
        }
    }
    mutation dislikeMutation($payload: UnlikeData!) {
        unlikeTweetOrComment(payload: $payload) {
            id
        }
    }
`);
