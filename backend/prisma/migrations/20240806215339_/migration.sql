/*
  Warnings:

  - You are about to drop the column `transferPrice` on the `t_tour_day_price` table. All the data in the column will be lost.
  - Added the required column `transferprice` to the `t_tour_day_price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_tour_day_price" DROP COLUMN "transferPrice",
ADD COLUMN     "transferprice" INTEGER NOT NULL;
