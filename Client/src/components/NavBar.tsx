import { useCurrentUser } from "@/hooks/user";
import { navBar } from "@/utils/navBar";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BsTwitter } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { RiComputerLine } from "react-icons/ri";
import { LogOut, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/theme-context";

interface TwitterSidebarButton {
    title: string;
    icon: React.ElementType;
    link: string;
}

type Props = {};

const NavBar = (props: Props) => {
    const { user } = useCurrentUser();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
        () => navBar,
        [user?.id]
    );

    const handleLogout = () => {
        window.localStorage.removeItem("__twitter_token");
        console.log("clear");
        const token = window.localStorage.getItem("__twitter_token");
        console.log("token", token);
        router.push("/auth");
    };

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
                <div className="absolute bottom-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className=" flex justify-start gap-4 items-center hover:bg-slate-900 
                        w-auto p-0 md:py-2 md:px-4 hover:cursor-pointer hover:rounded-full"
                            >
                                {user && user.profileImageURL && (
                                    <Image
                                        className="rounded-full w-8 h-8"
                                        src={user?.profileImageURL}
                                        alt="user-image"
                                        height={30}
                                        width={30}
                                    />
                                )}
                                <div className="hidden sm:block">
                                    <h3 className="w-full text-nowrap">
                                        {user.firstName} {user.lastName}
                                    </h3>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="ml-5 mb-1 w-20 md:w-56">
                            {/* <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <CiLight className="mr-2 h-4 w-4" />
                                    <span>Theme</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem
                                            onClick={toggleTheme("light")}
                                        >
                                            <CiLight className="mr-2 h-4 w-4" />
                                            <span>Light</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={toggleTheme("dark")}
                                        >
                                            <MdDarkMode className="mr-2 h-4 w-4" />
                                            <span>Dark</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={toggleTheme("system")}
                                        >
                                            <RiComputerLine className="mr-2 h-4 w-4" />
                                            <span>System default</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub> */}
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
};

export default NavBar;
