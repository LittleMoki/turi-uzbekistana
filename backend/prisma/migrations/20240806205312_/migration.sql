-- DropForeignKey
ALTER TABLE "t_tour_team" DROP CONSTRAINT "t_tour_team_tour_id_fkey";

-- AddForeignKey
ALTER TABLE "t_tour_team" ADD CONSTRAINT "t_tour_team_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "t_tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
