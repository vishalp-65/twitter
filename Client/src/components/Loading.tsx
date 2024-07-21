import Image from "next/image";
import { BsTwitter } from "react-icons/bs";

export const Loading = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <BsTwitter className="animate-pulse duration-700 w-16 h-16" />
        </div>
    );
};
