import { graphql } from "../../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
    #graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`);

export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
            id
            profileImageURL
            email
            firstName
            lastName
            recommendedUsers {
                id
                firstName
                lastName
                profileImageURL
            }
            followers {
                id
                firstName
                lastName
                profileImageURL
            }
            following {
                id
                firstName
                lastName
                profileImageURL
            }
            tweets {
                id
                content
                author {
                    id
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }
`);

export const getUserByIdQuery = graphql(`
    #graphql
    query GetuserById($id: ID!) {
        getUserById(id: $id) {
            id
            email
            firstName
            lastName
            profileImageURL
            followerCount
            followingCount
            following {
                firstName
                id
                lastName
                profileImageURL
            }
            followers {
                firstName
                lastName
                id
                profileImageURL
            }
            tweets {
                content
                id
                imageURL
                createdAt
                totalLikes
                isLikedByCurrentUser
                totalComments
                author {
                    id
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }
`);

export const getSignedURLForUserProfileQuery = graphql(`
    query Query($imageName: String!, $imageType: String!) {
        getSignedURLForUserProfile(imageName: $imageName, imageType: $imageType)
    }
`);
