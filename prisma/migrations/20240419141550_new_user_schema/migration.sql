-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN DEFAULT false,
ADD COLUMN     "requester" BOOLEAN DEFAULT true,
ADD COLUMN     "workshop" BOOLEAN DEFAULT false;
