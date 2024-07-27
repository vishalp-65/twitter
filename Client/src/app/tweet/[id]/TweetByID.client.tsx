"use client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import Twitterlayout from "@/components/layout/TwitterLayout";
import { Tweet } from "../../../../gql/graphql";

interface TweetByIDProps {
    tweetInfo: Tweet;
}

const TweetByIDClient: React.FC<TweetByIDProps> = ({}) => {
    const router = useRouter();
    const { user: currentUser } = useCurrentUser();
    const queryClient = useQueryClient();

    const token = window.localStorage.getItem("__twitter_token");
    console.log("token", token);

    return (
        <div>
            <Twitterlayout>
                <div>Vishal</div>
            </Twitterlayout>
        </div>
    );
};

export default TweetByIDClient;
