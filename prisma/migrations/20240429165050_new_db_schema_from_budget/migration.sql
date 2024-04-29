/*
  Warnings:

  - You are about to drop the column `deadline` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "budget" DROP COLUMN "deadline",
DROP COLUMN "path";
