import { createGraphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { User } from "../../../gql/graphql";

interface ServerProps {
    userId: string;
}

export async function UserProfilePageServer({ userId }: ServerProps) {
    const graphqlClient = createGraphqlClient();

    const userInfo = await graphqlClient.request(getUserByIdQuery, {
        id: userId,
    });

    if (!userInfo?.getUserById) {
        throw new Error("User not found");
    }

    console.log("userInfo", userInfo);

    return userInfo.getUserById as User;
}
