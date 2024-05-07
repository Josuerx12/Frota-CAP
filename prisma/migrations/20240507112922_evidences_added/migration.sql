-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_workshopId_fkey";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_maintenceId_fkey";

-- CreateTable
CREATE TABLE "evidence" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maintenanceId" INTEGER,

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_maintenceId_fkey" FOREIGN KEY ("maintenceId") REFERENCES "MaintenceRequest"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "MaintenceRequest"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
