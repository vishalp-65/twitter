import React from "react";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { LiaTwitterSquare } from "react-icons/lia";

interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
    link: string;
}

export const SidebarMenuItems: TwitterSidebarButton[] = [
    {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "#",
    },
    {
        title: "Explore",
        icon: <BiHash />,
        link: "#",
    },
    {
        title: "Notifications",
        icon: <BsBell />,
        link: "#",
    },
    {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "#",
    },
    {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "#",
    },
    {
        title: "Twitter Blue",
        icon: <LiaTwitterSquare />,
        link: "#",
    },
    {
        title: "Profile",
        icon: <BiUser />,
        link: "#",
    },
    {
        title: "More Options",
        icon: <SlOptions />,
        link: "#",
    },
];
