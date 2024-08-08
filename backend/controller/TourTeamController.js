import prisma from '../db/db.config.js'

export const CreateTeams = async (req, res) => {
	const { name, photo } = req.body

	const team = await prisma.t_team.create({
		data: {
			name,
			photo,
		},
	})

	return res.json({
		status: 200,
		data: team,
	})
}

export const ShowAllTeams = async (req, res) => {
	const teams = await prisma.t_team.findMany({})

	if (!teams)
		return res.json({ status: 400, message: 'We did not find any teams' })

	return res.json({ status: 200, data: teams })
}

export const ShowTeams = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const findTeams = await prisma.t_team.findUnique({
		where: {
			id: id,
		},
	})

	if (!findTeams)
		return res.json({ status: 400, message: 'We did not find this team' })

	return res.json({ status: 200, data: findTeams })
}

export const EditTeams = async (req, res) => {
	const { id } = req.params
	const { name, photo } = req.body
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const findTeams = await prisma.t_team.findUnique({
		where: {
			id: id,
		},
	})

	if (!findTeams)
		return res.json({ status: 400, message: 'We did not find this team' })

	const EditTeams = await prisma.t_team.update({
		where: {
			id: id,
		},
		data: {
			name,
			photo,
		},
	})

	return res.json({
		status: 200,
		message: 'Teams is edited successfully',
		data: EditTeams,
	})
}

export const DeleteTeams = async (req, res) => {
	const { id } = req.params
	if (!id ) {
		return res.status(401).json({ message: 'id is invalid' });
	}

	const deleteTeams = await prisma.t_team.delete({
		where: {
			id: id,
		},
	})

	return res.json({ status: 200, message: 'We deleted team successfully' })
}
