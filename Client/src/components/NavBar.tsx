import { useCurrentUser } from "@/hooks/user";
import { navBar } from "@/utils/navBar";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BsTwitter } from "react-icons/bs";

interface TwitterSidebarButton {
    title: string;
    icon: React.ElementType;
    link: string;
}

type Props = {};

const NavBar = (props: Props) => {
    const { user } = useCurrentUser();

    const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
        () => navBar,
        [user?.id]
    );

    return (
        <div className="h-full flex items-start justify-center ml-2 md:mr-8 ">
            <div className="">
                <div className="text-3xl md:text-4xl hover:bg-gray-800 rounded-full md:p-4 p-2 cursor-pointer transition-all">
                    <BsTwitter />
                </div>
                <div className="flex justify-center items-center">
                    <ul>
                        {sidebarMenuItems.map((item) => (
                            <li key={item.title}>
                                <Link
                                    className="flex justify-start items-center gap-6 hover:bg-gray-800 rounded-full px-3 py-3
                                            w-fit cursor-pointer"
                                    href={item.link}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="hidden sm:inline">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-3 px-0.5 md:px-3">
                    <button className="hidden sm:block bg-twitterBlue font-semibold py-1.5 px-6 rounded-full w-full">
                        Tweet
                    </button>
                    <button className="block sm:hidden bg-twitterBlue font-semibold py-1.5 px-3 md:px-6 rounded-full">
                        <BsTwitter />
                    </button>
                </div>
            </div>
            {user && (
                <div
                    className="absolute bottom-5 flex justify-start gap-4 items-center hover:bg-slate-900 
                        w-fit px-3 py-3 hover:cursor-pointer hover:rounded-full"
                >
                    {user && user.profileImageURL && (
                        <Image
                            className="rounded-full"
                            src={user?.profileImageURL}
                            alt="user-image"
                            height={30}
                            width={30}
                        />
                    )}
                    <div className="hidden sm:block">
                        <h3 className="w-full">
                            {user.firstName} {user.lastName}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
