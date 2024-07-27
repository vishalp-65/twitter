import React, { useCallback, useState } from "react";
import Image from "next/image";
import { BiUpload } from "react-icons/bi";
import { FaHeart, FaRegCommentAlt, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { Tweet } from "../../gql/graphql";
import { PiDotsThreeBold } from "react-icons/pi";
import { useToggleLike } from "@/hooks/like";
import { isNumericString, timeAgo, timestampToISO } from "@/utils/helper";

interface FeedCardProps {
    data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props;
    //Hooks
    const toggleLike = useToggleLike();
    const [isLikedFast, setIsLikedFast] = useState(data.isLikedByCurrentUser);

    // States
    const [likeCount, setLikeCount] = useState({
        tweetLikeCount: data.totalLikes,
        commentLikeCount: 1,
    });
    const [isLiked, setIsLiked] = useState({
        isTweetLiked: data.isLikedByCurrentUser,
        isCommentLike: false,
    });

    const handleLikeUnlike = useCallback((tweetId: string) => {
        setIsLikedFast(!isLikedFast);
        try {
            toggleLike.mutate(
                { tweetId },
                {
                    onSuccess: (responseData: any) => {
                        setLikeCount((prev) => ({
                            ...prev,
                            tweetLikeCount: responseData.likeCount,
                        }));
                        setIsLikedFast(responseData.isLiked);
                        setIsLiked((prev) => ({
                            ...prev,
                            isTweetLiked: responseData.isLiked,
                        }));
                    },
                }
            );
        } catch (error) {
            setIsLikedFast(isLikedFast);
        }
    }, []);

    return (
        <div
            key={data.id}
            className="border border-x-0 border-b-0 border-gray-600 py-3
            hover:bg-gray-100 dark:hover:bg-slate-950/50 transition-all overflow-auto"
        >
            <div className="flex flex-col items-start justify-start px-5">
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-start md:items-center justify-start gap-4">
                        {data.author?.profileImageURL && (
                            <Image
                                className="rounded-full w-9 h-9 md:w-12 md:h-12 mt-1 md:mt-0"
                                src={data.author.profileImageURL}
                                alt="user-image"
                                height={50}
                                width={50}
                                objectFit="cover"
                            />
                        )}
                        <div className="flex flex-col items-start justify-between gap-1">
                            <div className="flex flex-col md:flex md:flex-row items-start md:items-center justify-start flex-wrap">
                                <p className="font-bold text-lg text-nowrap">
                                    <Link href={`/${data.author?.id}`}>
                                        {data.author?.firstName}{" "}
                                        {data.author?.lastName}
                                    </Link>
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-xs text-nowrap md:text-sm ml-0 md:ml-2">
                                    {isNumericString(data.createdAt!)
                                        ? timeAgo(
                                              timestampToISO(
                                                  Number(data.createdAt!)
                                              )
                                          )
                                        : timeAgo(data.createdAt!)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-2 cursor-pointer  hover:bg-slate-300 dark:hover:bg-gray-800 hover:rounded-full hover:text-twitterBlue">
                        <PiDotsThreeBold className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <p className="text-start mt-4 mb-2 px-7">{data.content}</p>
            <div className="flex flex-col items-center justify-center mt-3 overflow-hidden py-1 px-7 gap-2 cursor-pointer">
                <Link href={`/tweet/${data.id}`}>
                    {data.imageURL && (
                        <Image
                            src={data.imageURL}
                            alt="image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-xl w-auto max-h-96 overflow-hidden"
                        />
                    )}
                </Link>
            </div>
            <div className="flex justify-between items-center p-2 mt-2 px-5 md:px-10 text-lg w-full text-gray-700 dark:text-gray-400">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <FaRegCommentAlt />
                    <p className="text-sm">{data?.totalComments}</p>
                </div>
                <div
                    className="flex items-center justify-center gap-2 hover:text-red-300 cursor-pointer"
                    onClick={() => handleLikeUnlike(data.id)}
                >
                    {isLikedFast ? (
                        <FaHeart className="text-red-700" />
                    ) : (
                        <AiOutlineHeart />
                    )}
                    <p className="text-sm">{likeCount.tweetLikeCount}</p>
                </div>
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <FaRetweet />
                    <p className="text-sm">200</p>
                </div>
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <BiUpload />
                    <p className="text-sm">490</p>
                </div>
            </div>
            {data.latestComment && (
                <div className="border border-t-gray-500 rounded-lg py-5 px-3">
                    <div className="flex items-start md:items-center justify-start gap-4">
                        {data.latestComment?.author?.profileImageURL && (
                            <Image
                                className="rounded-full w-5 h-5 md:w-7 md:h-7 mt-1 md:mt-0"
                                src={
                                    data.latestComment?.author?.profileImageURL
                                }
                                alt="user-image"
                                height={30}
                                width={30}
                                objectFit="cover"
                            />
                        )}
                        <div className="flex flex-col items-start justify-between gap-1">
                            <div className="flex flex-col md:flex md:flex-row items-start md:items-center justify-start flex-wrap">
                                <p className="font-bold text-nowrap">
                                    <Link
                                        href={`/${data.latestComment?.author?.id}`}
                                    >
                                        {data.latestComment?.author?.firstName}{" "}
                                        {data.latestComment?.author?.lastName}
                                    </Link>
                                </p>
                                <p className="text-gray-400 text-xs text-nowrap md:text-sm ml-0 md:ml-2">
                                    {isNumericString(
                                        data.latestComment?.createdAt!
                                    )
                                        ? timeAgo(
                                              timestampToISO(
                                                  Number(
                                                      data.latestComment
                                                          ?.createdAt!
                                                  )
                                              )
                                          )
                                        : timeAgo(
                                              data.latestComment?.createdAt!
                                          )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between ml-5 px-5 mt-3">
                        <p>{data.latestComment?.content}</p>
                        <div
                            className="flex items-center justify-center gap-2 hover:text-red-300 cursor-pointer"
                            onClick={() =>
                                handleLikeUnlike(
                                    data.latestComment?.id
                                        ? data.latestComment.id
                                        : ""
                                )
                            }
                        >
                            {isLiked.isCommentLike ? (
                                <FaHeart className="text-red-700" />
                            ) : (
                                <AiOutlineHeart />
                            )}
                            <p className=" text-sm">
                                {likeCount.commentLikeCount}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedCard;
