import TweetByIDClient from "./TweetByID.client";
import { TweetByIDServer } from "./TweetByID.server";

interface Props {
    params: {
        id: string;
    };
}

const TweetByIDPage = async ({ params }: Props) => {
    console.log("parmas", params);
    const tweetInfo = await TweetByIDServer({ tweetID: params.id });

    return <TweetByIDClient tweetInfo={tweetInfo} />;
};

export default TweetByIDPage;
