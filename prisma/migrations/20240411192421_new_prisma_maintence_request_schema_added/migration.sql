-- AlterTable
ALTER TABLE "MaintenceRequest" ALTER COLUMN "observation" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 0;
