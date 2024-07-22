import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "./jwt";
import { genSaltSync, hashSync } from "bcrypt";
import bcrypt from "bcrypt";

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

export interface createUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImageURL?: string;
}

export interface LoginUserData {
    email: string;
    password: string;
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

    public static async createUser(data: createUserData) {
        if (!data) {
            throw new Error("All fields required");
        }
        const user = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (user) {
            throw new Error("User with email already exists");
        }

        const encryptedPassword = hashSync(data.password, genSaltSync(9));

        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: encryptedPassword,
                    profileImageURL: data.profileImageURL
                        ? data.profileImageURL
                        : "https://avatar.iran.liara.run/public/boy?username=Ash",
                },
            });
            console.log("User created");
        }

        const userInDb = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!userInDb) throw new Error("User with email not found");

        const userToken = JWTService.generateTokenForUser(userInDb);

        if (!userToken) throw new Error("Token generation failed");

        return { token: userToken };
    }

    public static async loginUser(data: LoginUserData) {
        if (!data) {
            throw new Error("All field required");
        }

        const user = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new Error("User not found, try to signup first");
        }

        if (!user.password) {
            throw new Error("Login with gamil");
        }

        const isPasswordMatch = await bcrypt.compareSync(
            data.password,
            user.password!
        );

        if (!isPasswordMatch) {
            throw new Error("Password not match");
        }

        const userToken = JWTService.generateTokenForUser(user);

        if (!userToken) throw new Error("Token generation failed");

        return { token: userToken };
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
        const count = await prismaClient.follows.findMany({
            where: { following: { id: id } },
            include: {
                follower: true,
            },
        });
        return count.length;
    }

    // Function to count followings of a user
    public static async followingCount(id: string): Promise<number> {
        const count = await prismaClient.follows.findMany({
            where: { follower: { id: id } },
            include: {
                following: true,
            },
        });
        return count.length;
    }
}

export default UserService;
