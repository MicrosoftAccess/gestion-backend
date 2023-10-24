/*
  Warnings:

  - You are about to drop the column `nrc` on the `NRC` table. All the data in the column will be lost.
  - Added the required column `VRId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `NRC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "VRId" INTEGER NOT NULL,
ADD COLUMN     "vrResponse" TEXT;

-- AlterTable
ALTER TABLE "NRC" DROP COLUMN "nrc",
ADD COLUMN     "code" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_VRId_fkey" FOREIGN KEY ("VRId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
