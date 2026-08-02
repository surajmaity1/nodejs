import { config } from "@/config/config";
import { CookieOptions } from "express";

const COOKIE_EXPIRES = 30 * 24 * 60 * 60 * 60;

export const authCookie: CookieOptions = {
  domain: config.COOKIE_DOMAIN,
  expires: new Date(Date.now() + COOKIE_EXPIRES),
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

export const oauthState: CookieOptions = {
  ...authCookie,
  maxAge: 10 * 60 * 1000,
};

export const accessToken: CookieOptions = {
  ...authCookie,
  maxAge: parseInt(config.ACCESS_TOKEN_LIFETIME),
};

export const refreshToken: CookieOptions = {
  ...authCookie,
  maxAge: parseInt(config.REFRESH_TOKEN_LIFETIME),
};
