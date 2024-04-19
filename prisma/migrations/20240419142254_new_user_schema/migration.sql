/*
  Warnings:

  - Made the column `requester` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "frotas" BOOLEAN DEFAULT false,
ALTER COLUMN "requester" SET NOT NULL;
