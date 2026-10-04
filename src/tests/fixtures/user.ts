import { User } from "../../../generated/prisma/client";

export const TEST_USERS: User[] = [
  {
    id: "74ab6f20-0ef2-4461-832f-8eea445103b9",
    username: "arit",
    email: "arit@gmail.com",
    contactNumber: 1234567890,
    name: "Arit",
    signInProvider: "DEFAUTL",
    signInProviderId: "74ab6f20-0ef2-4468-832f-8eea445103b4",
    image: "arit.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
];
