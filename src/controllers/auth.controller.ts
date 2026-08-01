import { config } from "@/config/config"
import { OAUTH_COOKIE_NAME } from "@/constants/auth";
import { INTERNAL_SERVER_ERROR } from "@/constants/global";
import { getAuthorizationURL, gooogleOAuthHandleCallback } from "@/services/auth.services";
import { createOrUpdateUserDetails } from "@/services/user.services";
import { oauthState } from "@/utils/cookie";
import logger from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export const googleLoginController = (req: Request, res: Response)=> {
    try {
        const {authURL, state} = getAuthorizationURL();
        res.cookie(OAUTH_COOKIE_NAME, state, oauthState);
        res.redirect(authURL);
    } catch (error) {
        logger.error("Error while generating Google auth URL", error);
        res.status(500).json({
            message: INTERNAL_SERVER_ERROR
        });
    }
}

export const googleCallbackController = async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const {error, state, code} = req.query;

        if (error) {
            return res.redirect(`${config.FRONTEND_BASE_URL}?error=${error}`);
        }

        if (!code) {
            return res.redirect(`${config.FRONTEND_BASE_URL}?missing_code`);
        }

        if (!state) {
            return res.redirect(`${config.FRONTEND_BASE_URL}?missing_state`);
        }

        const storedState = req.cookies[OAUTH_COOKIE_NAME];

        if (storedState && storedState !== state) {
            return res.redirect(`${config.FRONTEND_BASE_URL}?invalid_state`);
        }

        res.clearCookie(OAUTH_COOKIE_NAME);
        const googleUserData = await gooogleOAuthHandleCallback(code as string);
        const user = await createOrUpdateUserDetails(googleUserData);

        // const tokens = generateTokenPair()

        res.status(200).json({
            message: "User fetched successfully",
            data: user,
        });
        
    } catch (error) {
        logger.error("Error while signing with Google", error);
        next(error);
        // res.status(500).json({
        //     message: INTERNAL_SERVER_ERROR
        // });
    }
}