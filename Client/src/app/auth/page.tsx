"use client";
import { graphqlClient } from "@/clients/api";
import { DialogAuth } from "@/components/AuthDialogBox";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCreateUser, useCurrentUser, useLoginUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";

type Props = {};

interface RegisterI {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImageURL: string;
}

interface LoginI {
    email: string;
    password: string;
}

const IndexPage = (props: Props) => {
    const { mutateAsync: createUser } = useCreateUser();
    const { mutateAsync: loginUser } = useLoginUser();

    const router = useRouter();
    const { user, isLoading } = useCurrentUser();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState<"login" | "register">(
        "login"
    );
    const [registerData, setRegisterData] = useState<RegisterI>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileImageURL: "",
    });
    const [loginData, setLoginData] = useState<LoginI>({
        email: "",
        password: "",
    });

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

    // Create user
    const handleRegister = useCallback(async () => {
        if (
            !registerData.firstName ||
            !registerData.lastName ||
            !registerData.email ||
            !registerData.password
        ) {
            toast.error("All fields are required");
            return;
        }
        try {
            const response = await createUser({
                ...registerData,
            });

            if (response.createUser?.token) {
                window.localStorage.setItem(
                    "__twitter_token",
                    response.createUser.token
                );
                toast.success("Registration Successful");
                router.push("/");
            }
        } catch (error) {
            toast.error("Registration failed");
            console.error("Registration error:", error);
        }
    }, [createUser, registerData]);

    // Login function
    const handleLogin = useCallback(async () => {
        if (!loginData.email || !loginData.password) {
            toast.error("All fields are required");
            return;
        }
        console.log("data", loginData);
        try {
            const response = await loginUser({
                ...loginData,
            });

            if (response.loginUser?.token) {
                window.localStorage.setItem(
                    "__twitter_token",
                    response.loginUser.token
                );
                toast.success("Logged in");
                router.push("/");
            }
        } catch (error) {
            toast.error("Invalid Credential");
            console.error("Registration error:", error);
        }
    }, [loginUser, registerData]);

    const openDialog = (action: "login" | "register") => {
        setDialogAction(action);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const saveDialog = () => {
        if (dialogAction === "register") {
            handleRegister();
        } else {
            handleLogin();
        }
        // setIsDialogOpen(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="h-screen flex items-center justify-center px-2 text-black dark:text-white">
            <div className="flex flex-col lg:flex lg:flex-row items-center justify-evenly gap-10 lg:gap-48 text-center">
                <div className="text-start h-20 w-20 lg:h-60 lg:w-60">
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
                                <span className="px-4 text-gray-500">or</span>
                                <hr className="flex-grow border-gray-500" />
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full px-4 bg-blue-500 hover:bg-blue-400 text-white rounded-full py-1.5"
                                onClick={() => {
                                    setIsDialogOpen(true);
                                    setDialogAction("register");
                                }}
                            >
                                Create Account
                            </Button>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-3 mt-5">
                            <p className="text-base font-semibold">
                                Already have an account?
                            </p>
                            <Button
                                variant="ghost"
                                className="w-[17rem] bg-blue-50 dark:bg-transparent border border-gray-300 rounded-full"
                                onClick={() => {
                                    setIsDialogOpen(true);
                                    setDialogAction("login");
                                }}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <DialogAuth
                isDialogOpen={isDialogOpen}
                action={dialogAction}
                data={
                    dialogAction === "register"
                        ? {
                              ...registerData,
                              setFirstName: (value: string) =>
                                  setRegisterData((prev) => ({
                                      ...prev,
                                      firstName: value,
                                  })),
                              setLastName: (value: string) =>
                                  setRegisterData((prev) => ({
                                      ...prev,
                                      lastName: value,
                                  })),
                              setEmail: (value: string) =>
                                  setRegisterData((prev) => ({
                                      ...prev,
                                      email: value,
                                  })),
                              setPassword: (value: string) =>
                                  setRegisterData((prev) => ({
                                      ...prev,
                                      password: value,
                                  })),
                              setImage: (value: string) =>
                                  setRegisterData((prev) => ({
                                      ...prev,
                                      profileImageURL: value,
                                  })),
                          }
                        : {
                              ...loginData,
                              setEmail: (value: string) =>
                                  setLoginData((prev) => ({
                                      ...prev,
                                      email: value,
                                  })),
                              setPassword: (value: string) =>
                                  setLoginData((prev) => ({
                                      ...prev,
                                      password: value,
                                  })),
                          }
                }
                onClose={closeDialog}
                onSave={saveDialog}
            />
        </div>
    );
};

export default IndexPage;
