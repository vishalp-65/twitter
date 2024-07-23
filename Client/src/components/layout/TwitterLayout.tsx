"use client";
import React from "react";
import NavBar from "../NavBar";
import RecommendedUser from "../RecommendedUser";

interface TwitterlayoutProps {
    children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
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
            <div className="hidden lg:block lg:col-span-3 xl:col-span-3 py-4 sm:ml-0 lg:-ml-7">
                <RecommendedUser />
            </div>
        </div>
    );
};

export default Twitterlayout;
