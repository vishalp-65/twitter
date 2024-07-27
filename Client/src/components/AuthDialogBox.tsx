import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import userImage from "../../public/user.png";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { createGraphqlClient } from "@/clients/api";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import { getSignedURLForUserProfileQuery } from "@/graphql/query/user";

interface UserDataI {
    isDialogOpen: boolean;
    action: "login" | "register";
    data: {
        firstName?: string;
        lastName?: string;
        email: string;
        password: string;
        profileImageURL?: string;
        setFirstName?: (value: string) => void;
        setLastName?: (value: string) => void;
        setEmail: (value: string) => void;
        setPassword: (value: string) => void;
        setImage?: (value: string) => void;
    };
    isClicked: boolean;
    onClose: () => void;
    onSave: () => void;
}

export function DialogAuth({
    isDialogOpen,
    action,
    data,
    isClicked,
    onClose,
    onSave,
}: UserDataI) {
    const [imageURL, setImageURL] = useState(data.profileImageURL || "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const graphqlClient = createGraphqlClient();

    const handleInputChangeFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file: File | null | undefined = event.target.files?.[0];
        if (!file) return;

        const { getSignedURLForUserProfile } = await graphqlClient.request(
            getSignedURLForUserProfileQuery,
            {
                imageName: file.name,
                imageType: file.type,
            }
        );

        if (getSignedURLForUserProfile) {
            toast.loading("Uploading...", { id: "2" });
            await axios.put(getSignedURLForUserProfile, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });
            toast.success("Upload Completed", { id: "2" });
            const url = new URL(getSignedURLForUserProfile);
            const myFilePath = `${url.origin}${url.pathname}`;
            setImageURL(myFilePath);
        }
    };

    useEffect(() => {
        if (
            action === "register" &&
            data.setImage &&
            imageURL !== data.profileImageURL
        ) {
            data.setImage(imageURL);
        }
    }, [imageURL, action, data]);

    const validateInputs = useCallback(() => {
        if (action === "register") {
            if (
                !data.firstName ||
                !data.lastName ||
                !data.email ||
                !data.password
            ) {
                toast.error("All fields are required for registration.");
                return false;
            }
        } else {
            if (!data.email || !data.password) {
                toast.error("Email and password are required for login.");
                return false;
            }
        }
        return true;
    }, [action, data]);

    const handleSave = useCallback(() => {
        if (validateInputs()) {
            onSave();
        }
    }, [validateInputs, onSave]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95%] md:max-w-[425px] bg-gray-200 dark:bg-gray-950">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {action === "register" ? "Register" : "Login"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-500">
                        {action === "register"
                            ? "Register to create a new account."
                            : "Login to your account."}
                    </DialogDescription>
                </DialogHeader>
                {action === "register" && (
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <input
                            ref={fileInputRef}
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleInputChangeFile}
                            className="hidden" // Hide the input visually
                        />
                        <div
                            className="relative w-20 h-20 rounded-full border border-gray-500 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {!imageURL ? (
                                <Image
                                    src={userImage}
                                    alt="demoImage"
                                    className="w-full h-full"
                                />
                            ) : (
                                <Image
                                    src={imageURL}
                                    alt="user image"
                                    className="w-full h-full rounded-full"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                            <div className="absolute text-2xl -bottom-2.5 left-[28%]">
                                <FaCirclePlus className="w-9 h-9 font-bold text-white border-gray-500" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4 py-4">
                    {action === "register" && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label
                                    htmlFor="firstName"
                                    className="text-left"
                                >
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    value={data.firstName || ""}
                                    onChange={(e) =>
                                        data.setFirstName &&
                                        data.setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="lastName" className="text-left">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    value={data.lastName || ""}
                                    onChange={(e) =>
                                        data.setLastName &&
                                        data.setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-left">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={data.email || ""}
                            onChange={(e) => data.setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className="text-left">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password || ""}
                            onChange={(e) => data.setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSave}
                        className="bg-twitterBlue text-white hover:bg-twitterBlue/70"
                        disabled={isClicked}
                    >
                        {action === "register" ? "Register" : "Login"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
