/*
  Warnings:

  - The primary key for the `Vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[plate]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");
