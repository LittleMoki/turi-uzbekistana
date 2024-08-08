/*
  Warnings:

  - Added the required column `hotel` to the `t_tourtoday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_tourtoday" ADD COLUMN     "hotel" INTEGER NOT NULL;
