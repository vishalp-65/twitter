import { createGraphqlClient } from "@/clients/api";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CreateTweetData } from "../../gql/graphql";

const graphqlClient = createGraphqlClient();

export const useCreateTweet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) =>
            graphqlClient.request(createTweetMutation, { payload }),
        onMutate: (payload) => toast.loading("Creating Tweet", { id: "1" }),
        onSuccess: async (payload) => {
            await queryClient.invalidateQueries({
                queryKey: ["all-tweets"],
            });
            toast.success("Created Success", { id: "1" });
        },
    });

    return mutation;
};

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ["all-tweets"],
        queryFn: () => graphqlClient.request(getAllTweetsQuery),
    });
    return { ...query, tweets: query.data?.getAllTweets };
};
