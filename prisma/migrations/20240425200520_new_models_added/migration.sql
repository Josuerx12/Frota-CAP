/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Workshop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workShopId` to the `MaintenceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" DROP COLUMN "workShopId",
ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_email_key" ON "Workshop"("email");

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
