"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
import {
    followUserMutation,
    unfollowUserMutation,
} from "@/graphql/mutation/user";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import Twitterlayout from "@/components/layout/TwitterLayout";
import { Tweet, User } from "../../../gql/graphql";
import { graphqlClient } from "@/clients/api";

interface UserProfilePageClientProps {
    userInfo: User;
}

const UserProfilePageClient: React.FC<UserProfilePageClientProps> = ({
    userInfo,
}) => {
    const router = useRouter();

    const { user: currentUser } = useCurrentUser();
    const queryClient = useQueryClient();

    console.log("all tweet", userInfo?.tweets);

    const amIFollowing = useMemo(() => {
        if (!userInfo) return false;
        return (
            (currentUser?.following?.findIndex(
                (el) => el?.id === userInfo.id
            ) ?? -1) >= 0
        );
    }, [currentUser?.following, userInfo]);

    const handleFollowUser = useCallback(async () => {
        if (!userInfo.id) return;

        await graphqlClient.request(followUserMutation, {
            to: userInfo.id,
        });
        await queryClient.invalidateQueries({
            queryKey: ["current-user"],
        });
    }, [userInfo.id, queryClient]);

    const handleUnfollowUser = useCallback(async () => {
        if (!userInfo.id) return;

        await graphqlClient.request(unfollowUserMutation, {
            to: userInfo.id,
        });
        await queryClient.invalidateQueries({
            queryKey: ["current-user"],
        });
    }, [userInfo.id, queryClient]);

    return (
        <div>
            <Twitterlayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BsArrowLeftShort
                            className="text-4xl cursor-pointer"
                            onClick={() => router.back()}
                        />
                        <div>
                            <h1 className="text-2xl font-bold">
                                {userInfo.firstName} {userInfo.lastName}
                            </h1>
                            <h1 className="text-md font-bold text-slate-500">
                                {userInfo?.tweets?.length} Tweets
                            </h1>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-slate-800 ml-3">
                        {userInfo.profileImageURL && (
                            <Image
                                src={userInfo.profileImageURL}
                                alt="user-image"
                                className="rounded-full"
                                width={100}
                                height={100}
                            />
                        )}
                        <h1 className="text-2xl font-bold mt-5">
                            {userInfo.firstName} {userInfo.lastName}
                        </h1>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 mt-2 text-sm text-gray-400">
                                <span>
                                    {userInfo?.followers?.length} followers
                                </span>
                                <span>
                                    {userInfo?.following?.length} following
                                </span>
                            </div>
                            {currentUser?.id !== userInfo.id && (
                                <>
                                    {amIFollowing ? (
                                        <button
                                            onClick={handleUnfollowUser}
                                            className="bg-white text-black px-3 py-1 rounded-full text-sm"
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleFollowUser}
                                            className="bg-white text-black px-3 py-1 rounded-full text-sm"
                                        >
                                            Follow
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        {userInfo?.tweets?.map((tweet) => (
                            <FeedCard data={tweet as Tweet} key={tweet?.id} />
                        ))}
                    </div>
                </div>
            </Twitterlayout>
        </div>
    );
};

export default UserProfilePageClient;
