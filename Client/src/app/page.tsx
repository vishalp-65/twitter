"use client";
import Feed from "@/components/Feed";
import Twitterlayout from "@/components/layout/TwitterLayout";
import { Loading } from "@/components/Loading";
import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { user, isLoading } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth");
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Twitterlayout>
                <Feed />
            </Twitterlayout>
        </div>
    );
}
