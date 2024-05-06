import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import FeedCard from "@/components/FeedCard/page";

type Props = {};

const LandingPage = (props: Props) => {
    return (
        <div>
            <div className="grid grid-cols-12 h-screen w-screen px-56">
                <SideBar />
                <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                </div>
                <div className="col-span-3"></div>
            </div>
        </div>
    );
};

export default LandingPage;
