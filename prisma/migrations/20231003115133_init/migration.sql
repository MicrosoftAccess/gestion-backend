/*
  Warnings:

  - Added the required column `authorId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL;
