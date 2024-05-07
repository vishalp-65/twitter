import LandingPage from "./home/page";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <LandingPage />
            </GoogleOAuthProvider>
        </>
    );
}
