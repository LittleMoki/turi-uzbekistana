import prisma from '../db/db.config.js'

export const CreateUsers = async (req, res) => {
    const {
        login,
        first_name,
        last_name,
        phone_number,
        password,
        email,
        role,
        photo,
    } = req.body

    const user = await prisma.t_users.create({
        data: {
            login,
            first_name,
            last_name,
            phone_number,
            password,
            email,
            role,
            photo,
        },
    })

    return res.json({
        status: 200,
        data: user,
    })
}

export const ShowAllUsers = async (req, res) => {
    const users = await prisma.t_users.findMany({})

    if (!users)
        return res.json({status: 400, message: 'We did not find any users'})

    return res.json({status: 200, data: users})
}

export const ShowUsers = async (req, res) => {
    const {id} = req.params
     if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const findUsers = await prisma.t_users.findUnique({
        where: {
            id: id,
        },
        include: {
            t_orders: true,
        }
    })

    if (!findUsers)
        return res.json({status: 400, message: 'We did not find this user'})

    return res.json({status: 200, data: findUsers})
}

export const EditUsers = async (req, res) => {
    const {id} = req.params
     if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}
    const {
        login,
        first_name,
        last_name,
        phone_number,
        password,
        email,
        role,
        photo,
    } = req.body

    const findUsers = await prisma.t_users.findUnique({
        where: {
            id: id,
        },
    })

    if (!findUsers)
        return res.json({status: 400, message: 'We did not find this user'})

    const EditUsers = await prisma.t_users.update({
        where: {
            id: id,
        },
        data: {
            login,
            first_name,
            last_name,
            phone_number,
            password,
            email,
            role,
            photo,
        },
    })

    return res.json({
        status: 200,
        message: 'Users is edited successfully',
        data: EditUsers,
    })
}

export const DeleteUsers = async (req, res) => {
    const {id} = req.params
     if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const deleteUsers = await prisma.t_users.delete({
        where: {
            id: id,
        },
    })

    return res.json({status: 200, message: 'We deleted user successfully'})
}
