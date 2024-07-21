import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";

export const navBar = [
    {
        title: "Home",
        icon: BiHomeCircle,
        link: "/",
    },
    {
        title: "Explore",
        icon: BiHash,
        link: "/explore",
    },
    {
        title: "Notifications",
        icon: BsBell,
        link: "/notifications",
    },
    {
        title: "Messages",
        icon: BsEnvelope,
        link: "/",
    },
    {
        title: "Bookmarks",
        icon: BsBookmark,
        link: "/",
    },
    {
        title: "Twitter Blue",
        icon: BiMoney,
        link: "/",
    },
    {
        title: "Profile",
        icon: BiUser,
        link: `/user`,
    },
    {
        title: "More Options",
        icon: SlOptions,
        link: "/",
    },
];
