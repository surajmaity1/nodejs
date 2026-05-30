import { Request, Response } from "express";

export type User = {
  id: string;
  username: string;
  email: string;
  contactNumber?: number;
  name: string;
  image: string;
  signInProvider: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type UserCreateRequest = Request & {
  body: User;
};

export type UserCreateResponse = Response;
