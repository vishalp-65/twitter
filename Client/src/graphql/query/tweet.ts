import { graphql } from "../../../gql";

export const getAllTweetsQuery = graphql(`
    #graphql

    query GetAllTweets {
        getAllTweets {
            id
            content
            imageURL
            totalLikes
            createdAt
            updatedAt
            isLikedByCurrentUser
            totalComments
            latestComment {
                author {
                    firstName
                    lastName
                    profileImageURL
                    id
                }
                content
                id
                createdAt
            }
            author {
                id
                firstName
                lastName
                profileImageURL
            }
        }
    }
`);

export const getSignedURLForTweetQuery = graphql(`
    query GetSignedURL($imageName: String!, $imageType: String!) {
        getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
    }
`);
