import prisma from '../db/db.config.js'

export const CreateAbout = async (req, res) => {
	const { name, position, employment, body, publick, order_number, photo } =
		req.body

	const order = await prisma.t_about.create({
		data: {
			name,
			position,
			employment,
			body,
			publick,
			order_number,
			photo,
		},
	})

	return res.json({
		status: 200,
		data: order,
	})
}

export const ShowAllAbout = async (req, res) => {
	const about = await prisma.t_about.findMany({})

	if (!about)
		return res.json({ status: 400, message: 'We did not find any about' })

	return res.json({ status: 200, data: about })
}

export const ShowAbout = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const findAbout = await prisma.t_about.findUnique({
		where: {
			id: id,
		},
	})

	if (!findAbout)
		return res.json({ status: 400, message: 'We did not find this order' })

	return res.json({ status: 200, data: findAbout })
}

export const EditAbout = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const { name, position, employment, body, publick, order_number, photo } =
		req.body

	const findAbout = await prisma.t_about.findUnique({
		where: {
			id: id,
		},
	})

	if (!findAbout)
		return res.json({ status: 400, message: 'We did not find this order' })

	const EditAbout = await prisma.t_about.update({
		where: {
			id: id,
		},
		data: {
			name,
			position,
			employment,
			body,
			publick,
			order_number,
			photo,
		},
	})

	return res.json({
		status: 200,
		message: 'About is edited successfully',
		data: EditAbout,
	})
}

export const DeleteAbout = async (req, res) => {
	const { id } = req.params
	if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

	const deleteAbout = await prisma.t_about.delete({
		where: {
			id: id,
		},
	})

	return res.json({ status: 200, message: 'We deleted order successfully' })
}
