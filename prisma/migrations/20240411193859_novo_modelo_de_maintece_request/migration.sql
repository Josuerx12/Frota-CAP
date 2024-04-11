/*
  Warnings:

  - Added the required column `driverName` to the `MaintenceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenceRequest" ADD COLUMN     "driverName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_plate_fkey" FOREIGN KEY ("plate") REFERENCES "Vehicle"("plate") ON DELETE RESTRICT ON UPDATE CASCADE;
