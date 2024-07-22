import { graphql } from "../../../gql";

export const followUserMutation = graphql(`
    #graphql
    mutation FollowUser($to: ID!) {
        followUser(to: $to)
    }
`);

export const unfollowUserMutation = graphql(`
    #graphql
    mutation UnfollowUser($to: ID!) {
        unfollowUser(to: $to)
    }
`);

export const createUserMutation = graphql(`
    #graphql
    mutation CreateUser($payload: CreateUserInput!) {
        createUser(payload: $payload) {
            token
        }
    }
`);

export const loginUserMutation = graphql(`
    #graphql
    mutation LoginUser($payload: LoginUserInput!) {
        loginUser(payload: $payload) {
            token
        }
    }
`);
