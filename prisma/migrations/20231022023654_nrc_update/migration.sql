/*
  Warnings:

  - You are about to drop the column `nrc` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'VR';

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'SOLVED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nrc";

-- CreateTable
CREATE TABLE "NRC" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "professorId" INTEGER,

    CONSTRAINT "NRC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_student" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_student_AB_unique" ON "_student"("A", "B");

-- CreateIndex
CREATE INDEX "_student_B_index" ON "_student"("B");

-- AddForeignKey
ALTER TABLE "NRC" ADD CONSTRAINT "NRC_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_student" ADD CONSTRAINT "_student_A_fkey" FOREIGN KEY ("A") REFERENCES "NRC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_student" ADD CONSTRAINT "_student_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
