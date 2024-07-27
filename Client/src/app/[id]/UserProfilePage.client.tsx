"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
import {
    followUserMutation,
    unfollowUserMutation,
} from "@/graphql/mutation/user";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import Twitterlayout from "@/components/layout/TwitterLayout";
import { Tweet, User } from "../../../gql/graphql";
import { createGraphqlClient } from "@/clients/api";

interface UserProfilePageClientProps {
    userInfo: User;
}

const UserProfilePageClient: React.FC<UserProfilePageClientProps> = ({
    userInfo,
}) => {
    const router = useRouter();
    const { user: currentUser } = useCurrentUser();
    const queryClient = useQueryClient();
    const [isFollow, setIsFollow] = useState(false);
    const graphqlClient = createGraphqlClient();

    const handleFollowUser = useCallback(async () => {
        if (!userInfo.id) return;

        // Optimistically update the UI
        setIsFollow(true);

        try {
            const response = await graphqlClient.request(followUserMutation, {
                to: userInfo.id,
            });

            if (response?.followUser) {
                setIsFollow(true);
                // Invalidate relevant queries
                await queryClient.invalidateQueries({
                    queryKey: ["current-user"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["recommended-users"],
                });
            } else {
                setIsFollow(false); // Revert the UI update on failure
            }
        } catch (error) {
            console.error("Error following user:", error);
            setIsFollow(false); // Revert the UI update on error
        }
    }, [userInfo.id, queryClient]);

    const handleUnfollowUser = useCallback(async () => {
        if (!userInfo.id) return;

        // Optimistically update the UI
        setIsFollow(false);

        try {
            const response = await graphqlClient.request(unfollowUserMutation, {
                to: userInfo.id,
            });

            if (response?.unfollowUser) {
                setIsFollow(false);
                // Invalidate relevant queries
                await queryClient.invalidateQueries({
                    queryKey: ["current-user"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["recommended-users"],
                });
            } else {
                setIsFollow(true); // Revert the UI update on failure
            }
        } catch (error) {
            console.error("Error unfollowing user:", error);
            setIsFollow(true); // Revert the UI update on error
        }
    }, [userInfo.id, queryClient]);

    useEffect(() => {
        const checkIfFollowing = () => {
            if (!userInfo) return false;
            return (
                (currentUser?.following?.findIndex(
                    (el: any) => el?.id === userInfo.id
                ) ?? -1) >= 0
            );
        };

        setIsFollow(checkIfFollowing());
    }, [userInfo, currentUser]);

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
                            <div className="flex gap-4 mt-2 text-sm text-gray-700 dark:text-gray-400">
                                <span>
                                    {userInfo?.followers?.length} followers
                                </span>
                                <span>
                                    {userInfo?.following?.length} following
                                </span>
                            </div>
                            {currentUser?.id !== userInfo.id && (
                                <>
                                    {isFollow ? (
                                        <button
                                            onClick={handleUnfollowUser}
                                            className="bg-gray-950 dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-sm"
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleFollowUser}
                                            className="bg-gray-950 dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-sm"
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
