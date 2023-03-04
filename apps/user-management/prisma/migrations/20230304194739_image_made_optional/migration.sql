/*
  Warnings:

  - You are about to drop the column `image` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
