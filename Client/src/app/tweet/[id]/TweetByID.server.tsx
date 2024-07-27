import { createGraphqlClient } from "@/clients/api";
import { getTweetByIDQuery } from "@/graphql/query/tweet";
import { Tweet } from "../../../../gql/graphql";

interface ServerProps {
    tweetID: string;
}

export async function TweetByIDServer({ tweetID }: ServerProps) {
    console.log("id", tweetID);
    const graphqlClient = createGraphqlClient();

    const tweetInfo = await graphqlClient.request(getTweetByIDQuery, {
        tweetId: tweetID,
    });

    if (!tweetInfo?.getTweetByID) {
        throw new Error("Tweet not found");
    }

    console.log("tweetInfo", tweetInfo);

    return tweetInfo.getTweetByID as Tweet;
}
