/*
  Warnings:

  - You are about to drop the column `authorId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "authorId",
DROP COLUMN "authorName",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
