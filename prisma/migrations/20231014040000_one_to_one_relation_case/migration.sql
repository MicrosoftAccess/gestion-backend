/*
  Warnings:

  - You are about to drop the column `campusId` on the `Case` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[caseId]` on the table `Campus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_campusId_fkey";

-- AlterTable
ALTER TABLE "Campus" ADD COLUMN     "caseId" INTEGER;

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "campusId";

-- CreateIndex
CREATE UNIQUE INDEX "Campus_caseId_key" ON "Campus"("caseId");

-- AddForeignKey
ALTER TABLE "Campus" ADD CONSTRAINT "Campus_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;
