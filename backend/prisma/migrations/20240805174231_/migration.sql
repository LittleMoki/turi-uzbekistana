/*
  Warnings:

  - You are about to drop the column `oldPrice` on the `t_tour` table. All the data in the column will be lost.
  - Added the required column `oldprice` to the `t_tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfer_price` to the `t_tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_tour" DROP COLUMN "oldPrice",
ADD COLUMN     "oldprice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transfer_price" TEXT NOT NULL;
