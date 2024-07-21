import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { Tweet } from "../../gql/graphql";
import { formatDate } from "@/utils/helper";
import { PiDotsThreeBold } from "react-icons/pi";

interface FeedCardProps {
    data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props;

    return (
        <div
            key={data.id}
            className="border border-x-0 border-b-0 border-gray-600 py-3 px-5 
            hover:bg-slate-950/50 transition-all overflow-auto"
        >
            <div className="flex flex-col items-start justify-start">
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
                                <p className="font-bold text-nowrap">
                                    <Link href={`/profile/${data.author?.id}`}>
                                        {data.author?.firstName}{" "}
                                        {data.author?.lastName}
                                    </Link>
                                </p>
                                <p className="text-gray-400 text-xs text-nowrap md:text-sm ml-0 md:ml-2">
                                    {formatDate(data.createdAt!)}
                                </p>
                            </div>
                            <p>{data.content}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-800 hover:rounded-full hover:text-twitterBlue">
                        <PiDotsThreeBold className="w-5 h-5" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-3 overflow-hidden px-2 py-1">
                {data.imageURL && (
                    <Image
                        src={data.imageURL}
                        alt="image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="rounded-xl w-auto h-auto overflow-hidden"
                    />
                )}
            </div>
            <div className="flex justify-between mt-1 items-center p-2 px-1 md:px-7 text-xl w-full text-gray-400">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <BiMessageRounded />
                    <p className=" text-sm">2K</p>
                </div>
                <div className="flex items-center justify-center gap-2 hover:text-red-300 cursor-pointer">
                    <AiOutlineHeart />
                    <p className=" text-sm">2K</p>
                </div>
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <FaRetweet />
                    <p className=" text-sm">2K</p>
                </div>
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <BiUpload />
                    <p className=" text-sm">2K</p>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;
