import React from "react";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { LiaTwitterSquare } from "react-icons/lia";

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
        icon: <LiaTwitterSquare />,
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
