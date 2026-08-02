import { config } from "@/config/config";
import {
  GOOGLE_API_ERROR,
  TOKEN_EXCHANGE_FAILED,
  USER_DETAILS_FETCH_FAILED,
  USER_DETAILS_MISSING,
} from "@/constants/auth";
import { UserDetails } from "@/types/auth";
import logger from "@/utils/logger";
import crypto from "crypto";

export const getAuthorizationURL = (): {
  authURL: string;
  state: string;
} => {
  const googleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const state = crypto.randomBytes(32).toString("hex");
  const params = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID,
    redirect_uri: config.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    state: state,
    prompt: "consent",
  });
  const authURL = `${googleAuthURL}?${params}`;

  return {
    authURL,
    state,
  };
};

const exchangeCodeForTokens = async (authorizationCode: string) => {
  try {
    const data = {
      client_id: config.GOOGLE_CLIENT_ID,
      client_secret: config.GOOGLE_CLIENT_SECRET,
      code: authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: config.GOOGLE_REDIRECT_URI,
    };
    const googleTokenURL = "https://oauth2.googleapis.com/token";
    const response = await fetch(googleTokenURL, {
      method: "POST",
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(TOKEN_EXCHANGE_FAILED);
    }

    const tokens = response.json();

    if ("error" in tokens) {
      throw new Error(GOOGLE_API_ERROR);
    }

    return tokens;
  } catch (error) {
    logger.error("Error while token exchanging", error);
    throw error;
  }
};

export const getUserDetails = async (accessToken: string): Promise<Object> => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const googleUserInfoURL = "https://www.googleapis.com/oauth2/v2/userinfo";
    const response = await fetch(googleUserInfoURL, {
      method: "GET",
      headers: headers,
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(USER_DETAILS_FETCH_FAILED);
    }

    const userDetails = await response.json();
    const requiredFields = ["id", "name", "email"];
    const missingFields = requiredFields.filter((field) => !(field in userDetails));

    if (missingFields.length > 0) {
      throw new Error(USER_DETAILS_MISSING);
    }

    return userDetails;
  } catch (error) {
    logger.error("Error while fetching Google user details");
    throw error;
  }
};

export const gooogleOAuthHandleCallback = async (
  authorizationCode: string,
): Promise<UserDetails> => {
  try {
    const tokens = await exchangeCodeForTokens(authorizationCode);
    const { id, email, name, picture } = (await getUserDetails(tokens.access_token)) as UserDetails;
    return { id, email, name, picture };
  } catch (error) {
    throw error;
  }
};
