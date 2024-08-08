// create news_type

import prisma from '../db/db.config.js'

export const CreateNewsType = async (req, res) => {
    const {
        name,
        description,
        photo,
        url,
        title,
        metakeywords,
        metadescription,
    } = req.body

    const findPage = await prisma.t_news_type.findFirst({
        where: {
            url: url,
        },
    });

    if (findPage) {
        return res.status(400).json({status: 400, message: 'Page with this URL already exists'});
    }

    const newsType = await prisma.t_news_type.create({
        data: {
            name,
            description,
            photo,
            url,
            title,
            metakeywords,
            metadescription,
        },
    })

    return res.json({status: 200, data: newsType})
}

// get news_type

export const ShowAllNewsType = async (req, res) => {
    const newsType = await prisma.t_news_type.findMany({})

    return res.json({status: 200, data: newsType})
}


// get by id news_type

export const ShowNewsType = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }
    const newsType = await prisma.t_news_type.findUnique({
        where: {
            id: id,
        },
        include: {
            news: true,
        },
    })

    if (!newsType)
        return res.json({status: 400, message: 'We did not find any newsType'})

    return res.json({status: 200, data: newsType})
}

export const EditNewsType = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }
    const {
        name,
        description,
        photo,
        url,
        title,
        metakeywords,
        metadescription,
    } = req.body

    const currentTourType = await prisma.t_news_type.findUnique({
        where: {
            id: id,
        },
    });

    // Если текущий URL отличается от нового, проверяем уникальность
    if (currentTourType.url !== url) {
        const findUniqueType = await prisma.t_news_type.findFirst({
            where: {
                url: url,
            },
        });

        if (findUniqueType) return res.status(404).send({message: 'Page with this URL already exists'});
    }

    const newType = await prisma.t_news_type.update({
        where: {
            id: id,
        },
        data: {
            name,
            description,
            photo,
            url,
            title,
            metakeywords,
            metadescription,
        },
    })
    return res.json({status: 200, data: newType})
}

// delete news_type

export const DeleteNewsType = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }
    const findNewsType = await prisma.t_news_type.findUnique({
        where: {
            id: id,
        },
    })

    if (!findNewsType)
        return res.json({status: 400, message: 'We did not find any newsType'})

    const newsType = await prisma.t_news_type.delete({
        where: {
            id: id,
        },
    })

    return res.json({status: 200, message: 'We deleted news type successfully'})
}
