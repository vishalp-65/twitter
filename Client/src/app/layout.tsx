import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./provider/QueryClientProvider";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Twitter",
    description: "Twitter clone",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>
                    <GoogleOAuthProvider clientId={clientId}>
                        <ThemeContextProvider>
                            <div
                                className="min-h-screen w-full flex justify-center items-center font-sans overflow-x-hidden
                            bg-white/20 dark:bg-black/95"
                            >
                                {children}
                            </div>
                            <Toaster />
                            <ThemeSwitch />
                        </ThemeContextProvider>
                    </GoogleOAuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
