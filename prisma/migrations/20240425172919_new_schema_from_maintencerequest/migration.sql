/*
  Warnings:

  - You are about to drop the column `atendedAt` on the `MaintenceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `MaintenceRequest` table. All the data in the column will be lost.
  - Added the required column `service` to the `MaintenceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" DROP COLUMN "atendedAt",
DROP COLUMN "observation",
ADD COLUMN     "service" TEXT NOT NULL,
ADD COLUMN     "serviceEndAt" TIMESTAMP(3),
ADD COLUMN     "serviceStartAt" TIMESTAMP(3),
ADD COLUMN     "serviceTime" DOUBLE PRECISION;
