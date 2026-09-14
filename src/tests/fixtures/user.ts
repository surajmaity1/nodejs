import { SignInProvider } from "../../../generated/prisma/enums";

type TestUserType = {
  id?: string;
  username: string | null;
  email: string;
  name: string;
  image: string | null;
  signInProvider: SignInProvider;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export const TEST_USERS: TestUserType[] = [
  {
    username: "arit",
    email: "arit@gmail.com",
    name: "Arit",
    signInProvider: "DEFAUTL",
    image: "arit.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
];
