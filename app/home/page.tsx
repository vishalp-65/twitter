import React from "react";
import SideBar from "./sideBar";

type Props = {};

const LandingPage = (props: Props) => {
    return (
        <div>
            <div className="grid grid-cols-12 h-screen w-screen px-56">
                <SideBar />
            </div>
        </div>
    );
};

export default LandingPage;
