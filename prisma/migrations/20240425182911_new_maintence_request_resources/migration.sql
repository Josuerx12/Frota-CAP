-- AlterTable
ALTER TABLE "MaintenceRequest" ADD COLUMN     "atendedAt" TIMESTAMP(3),
ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ADD COLUMN     "timeToSchedule" DOUBLE PRECISION;
