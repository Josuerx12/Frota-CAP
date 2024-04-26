-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_workshopId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
