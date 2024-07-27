import { createGraphqlClient } from "@/clients/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateUserInput, LoginUserInput } from "../../gql/graphql";
import { createUserMutation, loginUserMutation } from "@/graphql/mutation/user";
import toast from "react-hot-toast";

const graphqlClient = createGraphqlClient();

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["curent-user"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery),
    });

    return { ...query, user: query.data?.getCurrentUser };
};

export const useCreateUser = () => {
    const mutation = useMutation({
        mutationFn: (payload: CreateUserInput) =>
            graphqlClient.request(createUserMutation, { payload }),
        onMutate: (payload) => toast.loading("Creating User", { id: "1" }),
        onSuccess: async (payload) => {
            toast.success("Created Success", { id: "1" });
        },
    });

    return mutation;
};

export const useLoginUser = () => {
    const mutation = useMutation({
        mutationFn: (payload: LoginUserInput) =>
            graphqlClient.request(loginUserMutation, { payload }),
        onSuccess: async (payload) => {},
    });

    return mutation;
};
