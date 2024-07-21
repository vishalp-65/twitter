"use client";
import { graphqlClient } from "@/clients/api";
import { Loading } from "@/components/Loading";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";

type Props = {};

const IndexPage = (props: Props) => {
    const { user, isLoading } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/");
        }
    }, [isLoading, user, router]);

    const handleLoginWithGoogle = useCallback(
        async (cred: CredentialResponse) => {
            const googleToken = cred.credential;
            if (!googleToken) {
                toast.error("Google token not found");
                return;
            }

            try {
                const { verifyGoogleToken } = await graphqlClient.request(
                    verifyUserGoogleTokenQuery,
                    { token: googleToken }
                );

                if (verifyGoogleToken) {
                    window.localStorage.setItem(
                        "__twitter_token",
                        verifyGoogleToken
                    );
                    toast.success("Verified Success");
                    router.push("/");
                }
            } catch (error) {
                toast.error("Verification failed");
                console.error("Verification error:", error);
            }
        },
        [router]
    );

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="h-screen flex items-center justify-center px-2">
            <div className="flex flex-col lg:flex lg:flex-row items-center justify-evenly gap-10 lg:gap-48 text-center">
                <div className="text-white text-start h-20 w-20 lg:h-60 lg:w-60">
                    <FaXTwitter className="h-full w-full" />
                </div>

                <div className="flex flex-col items-center lg:items-start justify-between gap-10 lg:gap-5">
                    <p className="text-6xl font-bold font-serif text-wrap text-center lg:text-start">
                        Happening Now
                    </p>
                    <div className="flex flex-col items-start justify-between gap-7">
                        <p className="text-xl font-bold">Join today.</p>
                        <div className="w-[17rem] flex flex-col items-center justify-between gap-2">
                            <GoogleLogin onSuccess={handleLoginWithGoogle} />
                            <div className="flex items-center justify-center w-full px-1">
                                <hr className="flex-grow border-gray-500" />
                                <span className="px-4 text-gray-300">or</span>
                                <hr className="flex-grow border-gray-500" />
                            </div>
                            <button className="w-full px-4 bg-blue-500 text-white rounded-full py-1.5">
                                Create Account
                            </button>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-3 mt-5">
                            <p className="text-base font-semibold">
                                Already have an account?
                            </p>
                            <button className="w-[17rem] px-4 bg-transparent border border-gray-300 text-white rounded-full py-1.5">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
