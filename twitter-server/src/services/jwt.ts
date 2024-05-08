import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const JWT_SECRET = process.env.JWT_SECRET!;

class JWTService {
    public static generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email,
        };
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }

    public static decodeToken(token: string) {
        try {
            const user = JWT.verify(token, JWT_SECRET) as JWTUser;
            console.log("user", user);
            return user;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;
