import { config } from "@/config/config";
import jwt, { JwtPayload } from 'jsonwebtoken';

type UserDetails = {
    id: string,
    name: string,
};

type Token = "access" | "refresh";

const generateToken = (userId: string, tokenType: Token): string => {
    try {
        const now = Date.now();
        let token_lifetime = parseInt(config.ACCESS_TOKEN_LIFETIME);
        if (tokenType === "refresh") {
            token_lifetime = parseInt(config.REFRESH_TOKEN_LIFETIME);
        }
        const expired = new Date(now + token_lifetime * 1000).getTime();
        const payload: JwtPayload = {
            iss: "backend-auth",
            iat: now,
            exp: expired,
            sub: userId,
            user_id: userId,
            token_type: tokenType,
        };

        const token = jwt.sign(payload, config.PRIVATE_KEY, {
            algorithm: config.ALGORITHM as jwt.Algorithm,
        });

        return token;
    } catch (error) {
        throw error;
    }
}

const validateToken = (token: string, tokenType: Token) => {
    try {
        const payload = jwt.decode(token);
        // TODO : check payload condition before returing
        return payload;
    } catch (error) {
        throw error;
    }
}

export const generateTokenPair = (userDetails: UserDetails) => {
    const accessToken = generateToken(userDetails.id, "access")
    const refreshToken = generateToken(userDetails.id, "refresh")

    return {
        accessToken,
        refreshToken,
    }
}