import prisma from "../db/db.config.js";

export const CreateOrder = async (req, res) => {
    const {
        user_id,
        order_number,
        travellers_count,
        tour_date_start,
        tour_date_end,
        order_created,
        order_updated,
        price,
        deposit,
        balance,
        total_price,
        total_paid_price,
        payment_type,
        tour_type,
    } = req.body;

    console.log(req.body);

    // const order = await prisma.t_orders.create({
    //     data: {
    //         user_id,
    //         order_number,
    //         travellers_count,
    //         tour_date_start,
    //         tour_date_end,
    //         order_created,
    //         order_updated,
    //         price,
    //         deposit,
    //         balance,
    //         total_price,
    //         total_paid_price,
    //         payment_type,
    //         tour_type,
    //     }
    // })
    return res.json({status: 200, data: order})
}

export const ShowAllOrders = async (req, res) => {
    const orders = await prisma.t_tour.findMany({})
    return res.json({status: 200, data: orders})
}

export const showOrder = async (req, res) => {
    const {id} = req.params
    const order = await prisma.t_orders.findUnique({
        where: {
            id: id,
        }
    })
    return res.json({status: 200, data: order})
}

export const updateOrder = async (req, res) => {
    const {id} = req.params
    const {
        user_id,
        order_number,
        travellers_count,
        tour_date_start,
        tour_date_end,
        order_created,
        order_updated,
        price,
        deposit,
        balance,
        total_price,
        total_paid_price,
        payment_type,
        tour_type,
    } = req.body
    const order = await prisma.t_orders.update({
        where: {
            id: id,
        },
        data: {
            user_id,
            order_number,
            travellers_count,
            tour_date_start,
            tour_date_end,
            order_created,
            order_updated,
            price,
            deposit,
            balance,
            total_price,
            total_paid_price,
            payment_type,
            tour_type,
        }
    })
    return res.json({status: 200, data: order})
}

export const deleteOrders = async (req, res) => {
    const {id} = req.params
    const order = await prisma.t_orders.delete({
        where: {
            id: id,
        }
    })
    return res.json({status: 200, data: order})
}