/*
  Warnings:

  - You are about to drop the column `userId` on the `MaintenceRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE TEXT;
