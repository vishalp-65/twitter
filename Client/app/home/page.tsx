"use client";
import React, { useCallback } from "react";
import SideBar from "../../components/sideBar/sideBar";
import FeedCard from "@/components/FeedCard/page";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

type Props = {};

const LandingPage = (props: Props) => {
    const handleLoginWithGoogle = useCallback(
        async (cred: CredentialResponse) => {
            const googleToken = cred.credential;
            console.log(googleToken);
            if (!googleToken) return toast.error(`Google token not found`);

            const { verifyGoogleToken } = await graphqlClient.request(
                verifyUserGoogleTokenQuery,
                { token: googleToken }
            );

            toast.success("Verified Success");
            console.log(verifyGoogleToken);

            if (verifyGoogleToken)
                window.localStorage.setItem(
                    "__twitter_token",
                    verifyGoogleToken
                );
        },
        []
    );

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
                <div className="col-span-3 p-5">
                    <div className="p-5 bg-slate-700 rounded-lg">
                        <h1 className="my-2 text-2xl">New to Twitter?</h1>
                        <GoogleLogin onSuccess={handleLoginWithGoogle} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
