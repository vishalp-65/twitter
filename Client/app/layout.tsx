import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Twitter app",
    description: "Created by Vishal using Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    return (
        <html lang="en">
            <body className={inter.className}>
                <GoogleOAuthProvider clientId={clientId}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
