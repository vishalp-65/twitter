import React from "react";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";

interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
}

export const SidebarMenuItems: TwitterSidebarButton[] = [
    {
        title: "Home",
        icon: <BiHomeCircle />,
    },
    {
        title: "Explore",
        icon: <BiHash />,
    },
    {
        title: "Notifications",
        icon: <BsBell />,
    },
    {
        title: "Messages",
        icon: <BsEnvelope />,
    },
    {
        title: "Bookmarks",
        icon: <BsBookmark />,
    },
    {
        title: "Twitter Blue",
        icon: <BiMoney />,
    },
    {
        title: "Profile",
        icon: <BiUser />,
    },
    {
        title: "More Options",
        icon: <SlOptions />,
    },
];
