-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SOLVED', 'UNSOLVED');

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "nrc" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNSOLVED',

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);
