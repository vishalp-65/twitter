/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "twitter-dev-vp1.s3.ap-south-1.amazonaws.com",
            "twitter-bucket-vp.s3.ap-south-1.amazonaws.com",
            "i.imgur.com",
        ],
    },
};

export default nextConfig;
