/*
  Warnings:

  - You are about to drop the column `ownerOfReqId` on the `MaintenceRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_ownerOfReqId_fkey";

-- AlterTable
ALTER TABLE "MaintenceRequest" DROP COLUMN "ownerOfReqId",
ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
