import { graphqlClient } from "@/clients/api";
import { useMutation } from "@tanstack/react-query";
import { ToggleLikeMutation } from "@/graphql/mutation/like";

export const useToggleLike = () => {
    const mutation = useMutation({
        mutationFn: async (payload: {
            tweetId?: string;
            commentId?: string;
        }) => {
            const response = await graphqlClient.request(ToggleLikeMutation, {
                payload,
            });
            return response.toggleLikeTweetOrComment;
        },
        onSuccess: async (payload) => {},
        onError: (error) => {
            console.error("Error toggling like:", error);
        },
    });

    return mutation;
};
