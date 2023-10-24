/*
  Warnings:

  - You are about to drop the column `nrc` on the `Case` table. All the data in the column will be lost.
  - Added the required column `nrcId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "nrc",
ADD COLUMN     "nrcId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_nrcId_fkey" FOREIGN KEY ("nrcId") REFERENCES "NRC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
