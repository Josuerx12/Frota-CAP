/*
  Warnings:

  - You are about to drop the column `maintananceId` on the `osDocument` table. All the data in the column will be lost.
  - You are about to drop the column `maintenceRequestId` on the `osDocument` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "osDocument" DROP CONSTRAINT "osDocument_maintenceRequestId_fkey";

-- AlterTable
ALTER TABLE "osDocument" DROP COLUMN "maintananceId",
DROP COLUMN "maintenceRequestId",
ADD COLUMN     "maintenanceRequestId" INTEGER;

-- AddForeignKey
ALTER TABLE "osDocument" ADD CONSTRAINT "osDocument_maintenanceRequestId_fkey" FOREIGN KEY ("maintenanceRequestId") REFERENCES "MaintenceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
