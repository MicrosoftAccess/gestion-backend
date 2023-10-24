/*
  Warnings:

  - You are about to drop the `_student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_student" DROP CONSTRAINT "_student_A_fkey";

-- DropForeignKey
ALTER TABLE "_student" DROP CONSTRAINT "_student_B_fkey";

-- DropTable
DROP TABLE "_student";

-- CreateTable
CREATE TABLE "_studentNRC" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_studentNRC_AB_unique" ON "_studentNRC"("A", "B");

-- CreateIndex
CREATE INDEX "_studentNRC_B_index" ON "_studentNRC"("B");

-- AddForeignKey
ALTER TABLE "_studentNRC" ADD CONSTRAINT "_studentNRC_A_fkey" FOREIGN KEY ("A") REFERENCES "NRC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentNRC" ADD CONSTRAINT "_studentNRC_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
