-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_ownerOfReqId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenceRequest" DROP CONSTRAINT "MaintenceRequest_plate_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_providerId_fkey";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_maintenceId_fkey";

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_maintenceId_fkey" FOREIGN KEY ("maintenceId") REFERENCES "MaintenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_ownerOfReqId_fkey" FOREIGN KEY ("ownerOfReqId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_plate_fkey" FOREIGN KEY ("plate") REFERENCES "Vehicle"("plate") ON DELETE CASCADE ON UPDATE CASCADE;
