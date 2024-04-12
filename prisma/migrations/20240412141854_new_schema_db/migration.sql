/*
  Warnings:

  - Added the required column `deadline` to the `budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" ADD COLUMN     "checkoutAt" TIMESTAMP(3),
ADD COLUMN     "checkoutBy" TEXT,
ADD COLUMN     "deadlineToDeviler" TIMESTAMP(3),
ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deliveredAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "budget" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" INTEGER DEFAULT 0;
