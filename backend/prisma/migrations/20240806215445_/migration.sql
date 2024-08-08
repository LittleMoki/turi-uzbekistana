/*
  Warnings:

  - A unique constraint covering the columns `[tourid]` on the table `t_tour_day_price` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "t_tour_day_price_tourid_date_start_date_end_key";

-- CreateIndex
CREATE UNIQUE INDEX "t_tour_day_price_tourid_key" ON "t_tour_day_price"("tourid");
