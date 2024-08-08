/*
  Warnings:

  - You are about to drop the column `type_id` on the `t_news` table. All the data in the column will be lost.
  - Added the required column `typeid` to the `t_news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "t_news" DROP CONSTRAINT "t_news_type_id_fkey";

-- AlterTable
ALTER TABLE "t_news" DROP COLUMN "type_id",
ADD COLUMN     "typeid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "t_news" ADD CONSTRAINT "t_news_typeid_fkey" FOREIGN KEY ("typeid") REFERENCES "t_news_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
