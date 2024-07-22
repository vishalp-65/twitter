import { graphql } from "../../../gql";

export const ToggleLikeMutation = graphql(`
    #graphql
    mutation ToggleLikeTweetOrComment($payload: ToggleLikePayload!) {
        toggleLikeTweetOrComment(payload: $payload) {
            isLiked
            likeCount
        }
    }
`);
