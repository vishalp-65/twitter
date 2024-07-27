"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import { toast } from "react-hot-toast";
import { createGraphqlClient } from "@/clients/api";
import FeedCard from "./FeedCard";
import { Tweet } from "../../gql/graphql";
import { MdCancel } from "react-icons/md";
import RecommendedUser from "./RecommendedUser";

interface HomeProps {
    tweets?: Tweet[];
}

export default function Feed(props: HomeProps) {
    const { user } = useCurrentUser();
    const { tweets = props.tweets as Tweet[] } = useGetAllTweets();
    const { mutateAsync } = useCreateTweet();
    const graphqlClient = createGraphqlClient();

    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
        return async (event: Event) => {
            event.preventDefault();
            const file: File | null | undefined = input.files?.item(0);
            if (!file) return;

            const { getSignedURLForTweet } = await graphqlClient.request(
                getSignedURLForTweetQuery,
                {
                    imageName: file.name,
                    imageType: file.type,
                }
            );

            if (getSignedURLForTweet) {
                toast.loading("Uploading...", { id: "2" });
                await axios.put(getSignedURLForTweet, file, {
                    headers: {
                        "Content-Type": file.type,
                    },
                });
                toast.success("Upload Completed", { id: "2" });
                const url = new URL(getSignedURLForTweet);
                const myFilePath = `${url.origin}${url.pathname}`;
                setImageURL(myFilePath);
            }
        };
    }, []);

    const handleSelectImage = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        const handlerFn = handleInputChangeFile(input);

        input.addEventListener("change", handlerFn);

        input.click();
    }, [handleInputChangeFile]);

    const handleCreateTweet = useCallback(async () => {
        if (!content.trim() && !imageURL) {
            toast.error("Enter tweet");
            return;
        }
        await mutateAsync({
            content,
            imageURL,
        });
        setContent("");
        setImageURL("");
    }, [mutateAsync, content, imageURL]);

    return (
        <div className="w-full">
            <div>
                <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-gray-100 dark:hover:bg-slate-900 transition-all cursor-pointer">
                    <div className="flex flex-col items-start justify-between w-full">
                        <div className="flex items-start justify-between gap-4 w-full">
                            <div className="">
                                {user?.profileImageURL && (
                                    <Image
                                        className="rounded-full"
                                        src={user?.profileImageURL}
                                        alt="user-image"
                                        height={50}
                                        width={50}
                                    />
                                )}
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-transparent border-b border-slate-700 outline-none"
                                placeholder="What's happening?"
                                rows={3}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-2 mt-3">
                        <div>
                            {imageURL && (
                                <div
                                    className="relative border-gray-500 p-1.5 cursor-pointer"
                                    onClick={() => setImageURL("")}
                                >
                                    <Image
                                        src={imageURL}
                                        alt="tweet-image"
                                        width={250}
                                        height={250}
                                        className="rounded-md shadow-sm"
                                    />
                                    <div className="absolute -top-2 -right-2">
                                        <MdCancel className="w-7 h-7" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 flex justify-between items-center w-full px-4">
                            <div className="flex flex-col items-center text-gray-800 dark:text-gray-400 justify-between cursor-pointer hover:text-twitterBlue">
                                <BiImageAlt
                                    onClick={handleSelectImage}
                                    className="w-6 h-6"
                                />
                                <p className="text-xs">Upload</p>
                            </div>
                            <button
                                onClick={handleCreateTweet}
                                className="bg-twitterBlue text-white font-semibold text-sm py-2 px-4 rounded-full"
                            >
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:hidden">
                <RecommendedUser />
            </div>
            {tweets?.map((tweet: any) =>
                tweet ? (
                    <FeedCard key={tweet?.id} data={tweet as Tweet} />
                ) : null
            )}
        </div>
    );
}
