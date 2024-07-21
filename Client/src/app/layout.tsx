import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./provider/QueryClientProvider";

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
                        <div className="min-h-screen w-full flex justify-center items-center font-sans">
                            {children}
                        </div>
                        <Toaster />
                    </GoogleOAuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
