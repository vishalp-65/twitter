import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    console.log("env", process.env);

    return (
        <div className={inter.className}>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId="317917764574-fb8sbf8ogil5eobe26dlbv91a1rs923v.apps.googleusercontent.com">
                    <Component {...pageProps} />
                    <Toaster />
                    <ReactQueryDevtools />
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </div>
    );
}
