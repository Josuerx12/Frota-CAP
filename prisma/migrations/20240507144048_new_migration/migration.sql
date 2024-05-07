-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_maintenceId_fkey";

-- DropForeignKey
ALTER TABLE "evidence" DROP CONSTRAINT "evidence_maintenanceId_fkey";

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_maintenceId_fkey" FOREIGN KEY ("maintenceId") REFERENCES "MaintenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "MaintenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
