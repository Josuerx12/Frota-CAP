/*
  Warnings:

  - You are about to drop the column `deadlineToDeviler` on the `MaintenceRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" DROP COLUMN "deadlineToDeviler",
ADD COLUMN     "deadlineToDeliver" TIMESTAMP(3);
