-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_plate_fkey";

-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_workShopId_fkey";

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "Workshop"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_plate_fkey" FOREIGN KEY ("plate") REFERENCES "Vehicle"("plate") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
