import prisma from '../db/db.config.js'

export const createBanner = async (req, res) => {
	const { info, cityid } = req.body

	const banner = await prisma.t_banner.create({
		data: {
			info,
			cityid,
		},
	})

	res.json({ status: 200, data: banner })
}

export const ShowAllBanners = async (req, res) => {
	const banner = await prisma.t_banner.findMany({
		include: {
			city: true,
		},
	})
	if (!banner)
		return res.json({ status: 400, message: 'We did not find any banner' })

	res.json({ status: 200, data: banner })
}

export const ShowBanner = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const banner = await prisma.t_banner.findUnique({
		where: {
			id: id,
		},
		include: {
			city: true,
		},
	})
	if (!banner)
		return res.json({ status: 400, message: 'We could not find any banner' })

	res.json({ status: 200, data: banner })
}

export const DeleteBanner = async (req, res) => {
	const { id } = req.params
	if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

	const findBanner = await prisma.t_banner.findUnique({
		where: {
			id: id,
		},
	})

	if (!findBanner)
		return res.json({ status: 400, message: 'We could not find any banner' })

	const deleteBanner = await prisma.t_banner.delete({
		where: {
			id: id,
		},
	})

	res.json({ status: 200, message: 'Delete successfully' })
}
