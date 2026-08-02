import { Request, Response } from "express";

export type UserCreateRequestBody = {
  username: string;
  email: string;
  contactNumber?: number;
  name: string;
  image?: string;
};

export type UserCreateRequest = Request & {
  body: UserCreateRequestBody;
};

export type UserCreateResponse = Response;
