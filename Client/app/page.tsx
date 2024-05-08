"use client";
import { Toaster } from "react-hot-toast";
import LandingPage from "./home/page";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

export default function Home() {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={clientId}>
                    <LandingPage />
                    <Toaster />
                    <ReactQueryDevtools />
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </>
    );
}
