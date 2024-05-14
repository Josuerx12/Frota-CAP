-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_plate_fkey";

-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_workShopId_fkey";

-- AlterTable
ALTER TABLE "MaintenceRequest" ALTER COLUMN "plate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "Workshop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_plate_fkey" FOREIGN KEY ("plate") REFERENCES "Vehicle"("plate") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
