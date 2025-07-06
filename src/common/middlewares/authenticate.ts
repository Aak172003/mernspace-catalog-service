// This express-jwt is a middleware that validates the JWT token and extracts the user information from the token.
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksClient from "jwks-rsa";
import { Request } from "express";
import config from "config";
import { AuthCookie } from "../types";

export default expressjwt({
    secret: jwksClient.expressJwtSecret({
        jwksUri: config.get("auth.jwksUri"),
        // Cache for some time , for every request it will check the cache and if it is not there then it will fetch the key from the jwksUri
        cache: true,
        // Rate limit , so every service not make request to jwksUri
        rateLimit: true,
    }) as GetVerificationKey,
    algorithms: ["RS256"],

    // here i overwrite the gettoken functionality
    getToken(req: Request) {
        // first check form header where i send the bearer token in authorization key
        const authHeader = req.headers.authorization;

        // bearer token -> split into two parts from " " -> [bearer][token]
        // If not undefined which means we have token in header then return the token
        if (authHeader && authHeader.split(" ")[1] !== "undefined") {
            const token = authHeader.split(" ")[1];
            if (token) {
                return token;
            }
        }

        // 2nd way to get token form cookie , in our case we are sending accesstoken and refreshtoken in cookies
        const { accessToken } = req.cookies as AuthCookie;

        console.log("accessToken ::::::: ", accessToken);

        return accessToken;
    },
});
