import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const RecommendedUser = (props: Props) => {
    const { user } = useCurrentUser();

    return (
        <div
            className="px-4 w-full lg:w-72 py-5 border-gray-500 border-t lg:bg-gray-100 lg:border 
        lg:border-gray-600 shadow-lg dark:bg-black pl-4 lg:rounded-lg"
        >
            <h1 className="text-xl mb-3">Users you may know</h1>
            <div className="flex flex-row lg:flex lg:flex-col items-start gap-3 justify-start overflow-x-scroll">
                {user?.recommendedUsers?.map((el: any) => (
                    <div
                        className="flex flex-col lg:flex lg:flex-row items-center lg:items-start justify-center lg:justify-start lg:w-full gap-4 lg:gap-2 
                        mt-1 lg:mt-2 border-gray-400 dark:border-gray-600 rounded-md border py-2 px-3 shadow-md bg-gray-100 dark:bg-gray-900"
                        key={el?.id}
                    >
                        {el?.profileImageURL && (
                            <Image
                                src={el?.profileImageURL}
                                alt="user-image"
                                className="rounded-full"
                                width={50}
                                height={50}
                            />
                        )}
                        <div className="flex flex-col items-center lg:items-start justify-between gap-1">
                            <div className="text-lg">
                                {el?.firstName} {el?.lastName}
                            </div>
                            <Link
                                href={`/${el?.id}`}
                                className="bg-gray-300 text-black text-sm px-5 py-1 w-fit rounded-lg"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedUser;
