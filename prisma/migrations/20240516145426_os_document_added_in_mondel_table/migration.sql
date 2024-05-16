-- CreateTable
CREATE TABLE "osDocument" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT,
    "maintananceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maintenceRequestId" INTEGER,

    CONSTRAINT "osDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "osDocument" ADD CONSTRAINT "osDocument_maintenceRequestId_fkey" FOREIGN KEY ("maintenceRequestId") REFERENCES "MaintenceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
