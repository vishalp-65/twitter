// src/clients/api.ts
import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const createGraphqlClient = () => {
    const headers: Record<string, string> = {};

    if (isClient) {
        const token = window.localStorage.getItem("__twitter_token");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, { headers });
};
