import { graphql } from "../../../gql";

export const getAllCommentsByTweetID = graphql(`
    #graphql

    query getCommentsByTweet($tweetId: String!) {
        getCommentsByTweet(tweetId: $tweetId) {
            createdAt
            content
            id
            replies {
                content
                author {
                    firstName
                    id
                    profileImageURL
                    lastName
                }
                createdAt
                id
            }
            author {
                firstName
                profileImageURL
                lastName
                id
            }
        }
    }
`);
