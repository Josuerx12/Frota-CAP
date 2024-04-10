/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_ownerOfReqId_fkey";

-- AlterTable
ALTER TABLE "MaintenceRequest" ALTER COLUMN "ownerOfReqId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "position" SET DEFAULT ARRAY['requester']::TEXT[],
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_ownerOfReqId_fkey" FOREIGN KEY ("ownerOfReqId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
