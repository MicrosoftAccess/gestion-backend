/*
  Warnings:

  - You are about to drop the column `caseId` on the `Campus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campus" DROP CONSTRAINT "Campus_caseId_fkey";

-- DropIndex
DROP INDEX "Campus_caseId_key";

-- AlterTable
ALTER TABLE "Campus" DROP COLUMN "caseId";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "campusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
