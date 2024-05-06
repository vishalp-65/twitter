import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SidebarMenuItems } from "@/constant/sideBarMenu";

export default function SideBar() {
    return (
        <div className="col-span-3 pt-1 ml-28">
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
        </div>
    );
}
