/*
  Warnings:

  - You are about to drop the column `campus` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "campus",
ADD COLUMN     "campusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
