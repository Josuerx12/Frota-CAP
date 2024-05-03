/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Workshop` will be added. If there are existing duplicate values, this will fail.
  - Made the column `driverPhone` on table `MaintenceRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `os` on table `MaintenceRequest` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `phone` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" ALTER COLUMN "driverPhone" SET NOT NULL,
ALTER COLUMN "os" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workshop" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_phone_key" ON "Workshop"("phone");
