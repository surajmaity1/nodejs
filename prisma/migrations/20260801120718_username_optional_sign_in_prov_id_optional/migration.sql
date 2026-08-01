-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sign_in_provider_id" TEXT,
ALTER COLUMN "username" DROP NOT NULL;
