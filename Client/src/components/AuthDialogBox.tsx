import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { graphqlClient } from "@/clients/api";
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
    onClose: () => void;
    onSave: () => void;
}

export function DialogAuth({
    isDialogOpen,
    action,
    data,
    onClose,
    onSave,
}: UserDataI) {
    const [imageURL, setImageURL] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
        return async (event: Event) => {
            event.preventDefault();
            const file: File | null | undefined = input.files?.item(0);
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
    }, []);

    useEffect(() => {
        if (action === "register" && data.setImage) {
            data.setImage(imageURL);
        }
    }, [imageURL]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {action === "register" ? "Register" : "Login"}
                    </DialogTitle>
                    <DialogDescription>
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
                            onChange={(e) =>
                                handleInputChangeFile(
                                    e.target as HTMLInputElement
                                )(e as any)
                            }
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
                                <FaCirclePlus className="w-9 h-9 font-bold text-black dark:text-white" />
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
                    <Button type="submit" onClick={onSave}>
                        {action === "register" ? "Register" : "Login"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
