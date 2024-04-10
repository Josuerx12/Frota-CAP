-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT[],
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "plate" TEXT NOT NULL,
    "providerId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("plate")
);

-- CreateTable
CREATE TABLE "MaintenceRequest" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "km" INTEGER NOT NULL,
    "ownerOfReqId" INTEGER NOT NULL,
    "observation" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "atendedBy" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MaintenceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_key" ON "Provider"("name");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenceRequest" ADD CONSTRAINT "MaintenceRequest_ownerOfReqId_fkey" FOREIGN KEY ("ownerOfReqId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
