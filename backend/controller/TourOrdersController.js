import prisma from '../db/db.config.js'

export const CreateOrders = async (req, res) => {
	const {
		user_id,
		order_status,
		payment_status,
		order_number,
		travellers_count,
		tour_date_start,
		tour_date_end,
		order_created,
		order_updated,
		price,
		payment_id,
		deposit,
		balance,
		total_price,
		total_paid_price,
		payment_type,
		tour_type,
	} = req.body

	const order = await prisma.t_orders.create({
		data: {
			user_id,
			order_status,
			payment_status,
			order_number,
			travellers_count,
			tour_date_start,
			tour_date_end,
			order_created,
			order_updated,
			price,
			payment_id,
			deposit,
			balance,
			total_price,
			total_paid_price,
			payment_type,
			tour_type,
		},
	})

	return res.json({
		status: 200,
		data: order,
	})
}

export const ShowAllOrders = async (req, res) => {
	const orders = await prisma.t_orders.findMany({})

	if (!orders)
		return res.json({ status: 400, message: 'We did not find any orders' })

	return res.json({ status: 200, data: orders })
}

export const ShowOrders = async (req, res) => {
	const { id } = req.params

	const findOrders = await prisma.t_orders.findUnique({
		where: {
			id: id,
		},
	})

	if (!findOrders)
		return res.json({ status: 400, message: 'We did not find this order' })

	return res.json({ status: 200, data: findOrders })
}

export const EditOrders = async (req, res) => {
	const { id } = req.params
	const {
		user_id,
		order_status,
		payment_status,
		order_number,
		travellers_count,
		tour_date_start,
		tour_date_end,
		order_created,
		order_updated,
		price,
		payment_id,
		deposit,
		balance,
		total_price,
		total_paid_price,
		payment_type,
		tour_type,
	} = req.body

	const findOrders = await prisma.t_orders.findUnique({
		where: {
			id: id,
		},
	})

	if (!findOrders)
		return res.json({ status: 400, message: 'We did not find this order' })

	const EditOrders = await prisma.t_orders.update({
		where: {
			id: id,
		},
		data: {
			user_id,
			order_status,
			payment_status,
			order_number,
			travellers_count,
			tour_date_start,
			tour_date_end,
			order_created,
			order_updated,
			price,
			payment_id,
			deposit,
			balance,
			total_price,
			total_paid_price,
			payment_type,
			tour_type,
		},
	})

	return res.json({
		status: 200,
		message: 'Orders is edited successfully',
		data: EditOrders,
	})
}

export const DeleteOrders = async (req, res) => {
	const { id } = req.params

	const deleteOrders = await prisma.t_orders.delete({
		where: {
			id: id,
		},
	})

	return res.json({ status: 200, message: 'We deleted order successfully' })
}
