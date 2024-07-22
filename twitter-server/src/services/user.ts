import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "./jwt";

interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

class UserService {
    public static async verifyGoogleAuthToken(token: string) {
        const googleToken = token;
        const googleOauthURL = new URL(
            "https://oauth2.googleapis.com/tokeninfo"
        );
        googleOauthURL.searchParams.set("id_token", googleToken);

        const { data } = await axios.get<GoogleTokenResult>(
            googleOauthURL.toString(),
            {
                responseType: "json",
            }
        );

        const user = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture,
                },
            });
        }

        const userInDb = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!userInDb) throw new Error("User with email not found");

        const userToken = JWTService.generateTokenForUser(userInDb);

        return userToken;
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id } });
    }

    public static followUser(from: string, to: string) {
        return prismaClient.follows.create({
            data: {
                follower: { connect: { id: from } },
                following: { connect: { id: to } },
            },
        });
    }

    public static unfollowUser(from: string, to: string) {
        return prismaClient.follows.delete({
            where: {
                followerId_followingId: { followerId: from, followingId: to },
            },
        });
    }

    // Function to count followers of a user
    public static async followerCount(id: string): Promise<number> {
        const count = await prismaClient.follows.count({
            where: { followingId: id },
        });
        return count;
    }

    // Function to count followings of a user
    public static async followingCount(id: string): Promise<number> {
        const count = await prismaClient.follows.count({
            where: { followerId: id },
        });
        return count;
    }
}

export default UserService;
