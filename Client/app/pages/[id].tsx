import { useRouter } from "next/router";
import Image from "next/image";
import type { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import { Tweet, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import FeedCard from "@/components/FeedCard/page";
import LandingPage from "../home/page";

interface ServerProps {
    userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const router = useRouter();

    return (
        <div>
            <LandingPage>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BsArrowLeftShort className="text-4xl" />
                        <div>
                            <h1 className="text-2xl font-bold">Piyush Garg</h1>
                            <h1 className="text-md font-bold text-slate-500">
                                {props.userInfo?.tweets?.length} Tweets
                            </h1>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-slate-800">
                        {props.userInfo?.profileImageURL && (
                            <Image
                                src={props.userInfo?.profileImageURL}
                                alt="user-image"
                                className="rounded-full"
                                width={100}
                                height={100}
                            />
                        )}
                        <h1 className="text-2xl font-bold mt-5">Piyush Garg</h1>
                    </div>
                    <div>
                        {props.userInfo?.tweets?.map((tweet) => (
                            <FeedCard data={tweet as Tweet} key={tweet?.id} />
                        ))}
                    </div>
                </div>
            </LandingPage>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
    context
) => {
    const id = context.query.id as string | undefined;

    if (!id) return { notFound: true, props: { userInfo: undefined } };

    const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

    if (!userInfo?.getUserById) return { notFound: true };

    return {
        props: {
            userInfo: userInfo.getUserById as User,
        },
    };
};

export default UserProfilePage;
