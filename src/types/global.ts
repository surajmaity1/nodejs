import { Request, Response } from "express";

type UserData = {
    id: string,
    username?: string,
    email: string,
    contactNumber?: number,
    name: string,
    image?: string,
    signInProvider: string,
    signInProviderId: string,
    createdAt: string,
    updatedAt: string,
    isDeleted: boolean,
}

export type CustomRequest = Request & {
    userData: UserData
}

export type CustomResponse = Response;
