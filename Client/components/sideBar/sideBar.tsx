import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SidebarMenuItems } from "@/constant/sideBarMenu";
import Image from "next/image";
import Link from "next/link";

interface Props {
    user: {
        __typename?: "User" | undefined;
        id: string;
        profileImageURL?: string | null | undefined;
        email: string;
        firstName: string;
        lastName?: string | null | undefined;
    };
}

export const SideBar: React.FC<Props> = ({ user }) => {
    return (
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
            <div>
                <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
                    <BsTwitter />
                </div>
                <div className="mt-1 text-xl pr-4">
                    <ul>
                        {SidebarMenuItems.map((item) => (
                            <li key={item.title}>
                                <Link
                                    className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                                    href={item.link}
                                >
                                    <span className=" text-3xl">
                                        {item.icon}
                                    </span>
                                    <span className="hidden sm:inline">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5 px-3">
                        <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                            Tweet
                        </button>
                        <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                            <BsTwitter />
                        </button>
                    </div>
                </div>
            </div>
            {user && (
                <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
                    {user && user.profileImageURL && (
                        <Image
                            className="rounded-full"
                            src={user?.profileImageURL}
                            alt="user-image"
                            height={50}
                            width={50}
                        />
                    )}
                    <div className="hidden sm:block">
                        <h3 className="text-xl">
                            {user.firstName} {user.lastName}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};
