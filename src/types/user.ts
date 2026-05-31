import { Request, Response } from "express";

export type User = {
  username: string;
  email: string;
  contactNumber?: number;
  name: string;
  image?: string;
  signInProvider: string;
};

export type UserCreateRequest = Request & {
  body: User;
};

export type UserCreateResponse = Response;
