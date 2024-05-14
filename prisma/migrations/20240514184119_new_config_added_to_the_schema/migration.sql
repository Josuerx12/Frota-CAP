-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_workshopId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_providerId_fkey";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_maintenceId_fkey";

-- DropForeignKey
ALTER TABLE "evidence" DROP CONSTRAINT "evidence_maintenanceId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "workshopId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "providerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_maintenceId_fkey" FOREIGN KEY ("maintenceId") REFERENCES "MaintenceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "MaintenceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
