/*
  Warnings:

  - The `sign_in_provider` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SignInProvider" AS ENUM ('1', '2');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "sign_in_provider",
ADD COLUMN     "sign_in_provider" "SignInProvider" NOT NULL DEFAULT '1';
