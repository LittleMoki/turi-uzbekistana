import {compareSync, hash} from "bcrypt";
import prisma from "../db/db.config.js";
import jwt from 'jsonwebtoken'

const generatesToken = (id, role) => {
    const payload = {
        id,
        role
    }

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
    )
}

export const RegisterUser = async (req, res) => {
    try {
        const {
            first_name, last_name, phone_number, password, email, role, photo
        } = req.body;


        const validateEmail = await prisma.t_users.findUnique({
            where: {
                email
            }
        })

        if (validateEmail) return res.json({
            status: 400,
            message: 'This email already exists'
        })

        const hashedPassword = await hash(password, 7);

        const user = await prisma.t_users.create({
            data: {
                login: email, first_name, last_name, phone_number, password: hashedPassword, email, role, photo,
            },
        })

        const token = generatesToken(user.id, user.role)


        return res.status(200).json({data: user, token: token});
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

export const LoginUser = async (req, res) => {
    try {
        const {password, email} = req.body

        const user = await prisma.t_users.findUnique({
            where: {
                email
            }
        })
        if (!user) return res.status(401).json({email: 'We could not find this email'})

        const validPassword = compareSync(password, user.password)

        if (!validPassword) return res.status(401).json({password: 'Passwords incorrect'})

        const token = generatesToken(user.id,user.role)


        res.json({status: 200, data: user, token: token})
    } catch (err) {
        res.status(401).json({error: err.message})
    }

}

export const getUserByToken = async (req, res) => {
    const {tokens} = req.body

    const token = jwt.verify(tokens, process.env.JWT_SECRET)
    console.log(token)
}