import prisma from "../db/db.config.js";

export const createMainTourTeam = async (req, res) => {
    const {
        tour_id,
        team_id
    } = req.body;
    const tour = prisma.t_tour_team.create({
        data: {
            tour_id,
            team_id
        }
    })
    res.json({status: 200, data: tour});
}

export const editMainTourTeam = async (req, res) => {
    const {
        tour_id,
        team_id
    } = req.body;
    const {id} = req.params
    if (!id) {
        return res.status(401).json({ message: 'id is invalid' });
    }
    const tour = prisma.t_tour_team.update({
        where: {
            id: id,
        },
        data: {
            tour_id,
            team_id
        }
    })
    res.json({status: 200, data: tour});
}
export const showMainTourTeam = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({ message: 'id is invalid' });
    }
    const tour = prisma.t_tour_team.findUnique({
        where: {
            id: id,
        },
    })

    res.json({status: 200, data: tour});
}
export const showAllMainTourTeam = async (req, res) => {
    const tour = prisma.t_tour_team.findMany({
        include:{
            team:true
        }
    })
    res.json({status: 200, data: tour});
}
export const deleteMainTourTeam = async (req, res) => {
    const {
        tour_id,
        team_id
    } = req.body;
    const tour = prisma.t_tour_team.create({
        data: {
            tour_id,
            team_id
        }
    })
    res.json({status: 200, data: tour});
}
export const deleteAllMainTourTeam = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({ message: 'id is invalid' });
    }
    const tour = prisma.t_tour_team.delete({
        where:{
            id: id,
        }
    })

    res.json({status: 200, data: tour});
}