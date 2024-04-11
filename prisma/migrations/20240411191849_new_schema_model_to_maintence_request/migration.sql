-- AlterTable
ALTER TABLE "MaintenceRequest" ADD COLUMN     "atendedAt" TIMESTAMP(3),
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "finishedBy" TEXT DEFAULT '',
ALTER COLUMN "atendedBy" DROP NOT NULL,
ALTER COLUMN "atendedBy" SET DEFAULT '';

-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "maintenceId" INTEGER NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_maintenceId_fkey" FOREIGN KEY ("maintenceId") REFERENCES "MaintenceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
