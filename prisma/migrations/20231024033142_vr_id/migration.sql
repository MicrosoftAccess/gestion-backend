-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_VRId_fkey";

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "VRId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_VRId_fkey" FOREIGN KEY ("VRId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
