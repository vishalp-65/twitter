"use client";
import { useCurrentUser } from "@/hooks/user";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../NavBar";

interface TwitterlayoutProps {
    children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
    const { user } = useCurrentUser();

    return (
        <div className="grid grid-cols-12 min-h-screen w-screen items-start justify-center sm:px-10">
            {/* Navbar layout */}
            <div className="col-span-2 h-screen sm:col-span-3 pt-1 flex sm:justify-end pr-0 md:pr-4 relative w-full">
                <div className="fixed flex h-full">
                    <NavBar />
                </div>
            </div>

            {/* Children or feed */}
            <div className="col-span-10 sm:col-span-9 md:col-span-9 lg:col-span-6 xl:col-span-6 w-full md:w-[90%] border-r-[1px] border-l-[1px] h-full border-gray-600 relative">
                <div>{props.children}</div>
            </div>

            {/* Recommended user */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 py-4">
                <div className="px-4 w-fit py-3 bg-slate-800 rounded-lg">
                    <h1 className="my-2 text-lg mb-5">Users you may know</h1>
                    {user?.recommendedUsers?.map((el: any) => (
                        <div
                            className="flex items-center gap-3 mt-2"
                            key={el?.id}
                        >
                            {el?.profileImageURL && (
                                <Image
                                    src={el?.profileImageURL}
                                    alt="user-image"
                                    className="rounded-full"
                                    width={60}
                                    height={60}
                                />
                            )}
                            <div>
                                <div className="text-lg">
                                    {el?.firstName} {el?.lastName}
                                </div>
                                <Link
                                    href={`/${el?.id}`}
                                    className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Twitterlayout;
