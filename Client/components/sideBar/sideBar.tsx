import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SidebarMenuItems } from "@/constant/sideBarMenu";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";

export default function SideBar() {
    const { user } = useCurrentUser();

    return (
        <div className="col-span-3 pt-1 ml-28 relative">
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
                <BsTwitter />
            </div>
            <div className="mt-1 text-xl pr-4">
                <ul>
                    {SidebarMenuItems.map((item: any) => (
                        <li
                            className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                            key={item.title}
                        >
                            <span className="text-3xl">{item.icon}</span>
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-5 px-3">
                    <button className="bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                        Tweet
                    </button>
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
                    <div>
                        <h3 className="text-xl">
                            {user.firstName} {user.lastName}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
}
