/*
  Warnings:

  - The `breakfast` column on the `t_tourtoday` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lunch` column on the `t_tourtoday` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dinner` column on the `t_tourtoday` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "t_tourtoday" DROP COLUMN "breakfast",
ADD COLUMN     "breakfast" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "lunch",
ADD COLUMN     "lunch" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "dinner",
ADD COLUMN     "dinner" INTEGER NOT NULL DEFAULT 0;
