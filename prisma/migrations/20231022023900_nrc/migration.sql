/*
  Warnings:

  - Added the required column `nrc` to the `NRC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NRC" ADD COLUMN     "nrc" INTEGER NOT NULL;
