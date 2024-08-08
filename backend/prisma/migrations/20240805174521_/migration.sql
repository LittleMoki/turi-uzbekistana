/*
  Warnings:

  - You are about to drop the column `typeid` on the `t_news` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `t_news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "t_news" DROP CONSTRAINT "t_news_typeid_fkey";

-- AlterTable
ALTER TABLE "t_news" DROP COLUMN "typeid",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "t_news" ADD CONSTRAINT "t_news_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "t_news_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
