"use client";
import { Toaster } from "react-hot-toast";
import LandingPage from "./home/page";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import Cont from ".";
import CreateTweet from "@/components/createTweet";

const queryClient = new QueryClient();

export default function Home({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {/* <LandingPage {...pageProps} /> */}
                <CreateTweet {...pageProps} />
                <Toaster />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    );
}
