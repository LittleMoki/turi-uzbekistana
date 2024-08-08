// create news

import prisma from '../db/db.config.js'

export const CreateNews = async (req, res) => {
    const {
        new_date,
        header,
        body,
        firsttext,
        lang,
        type_id,
        view,
        photo,
        foto,
        fototext,
        title,
        metakeywords,
        metadescription,
        url,
        publick,
        country,
        tags,
    } = req.body

    // Проверка, существует ли страница с таким URL
    const findPage = await prisma.t_news.findFirst({
        where: {
            url: url,
        },
    });

    if (findPage) {
        return res.status(400).json({status: 400, message: 'Page with this URL already exists'});
    }


    const news = await prisma.t_news.create({
        data: {
            new_date,
            header,
            body,
            firsttext,
            lang,
            type_id,
            view,
            photo,
            foto,
            fototext,
            title,
            metakeywords,
            metadescription,
            url,
            publick,
            country,
            tags,
        },
    })

    res.json({status: 200, data: news})
}

// get news

export const ShowAllNews = async (req, res) => {
    const news = await prisma.t_news.findMany({
        include: {
            type: true,
        },
    })

    return res.json({status: 200, data: news})
}

// get by id news

export const ShowNews = async (req, res) => {
    const {id} = req.params

    if (!id && id === undefined) return res.status(401).json({message: 'id is invalid'})
    const news = await prisma.t_news.findUnique({
        where: {
            id: id,
        },
    })

    if (!news)
        return res.json({status: 400, message: 'We did not find any news'})

    res.json({status: 200, data: news})
}

export const ShowNewsUrlType = async (req, res) => {
    const { url } = req.params;

    try {
        if (!url) {
            return res.status(401).json({ message: 'url is invalid' });
        }

        const news = await prisma.t_news.findMany({
            where: {
                type: {
                    url: url
                }
            },
            include: {
                type: true
            }
        });

        if (news.length === 0) {
            return res.status(400).json({ message: 'No news found' });
        }

        return res.json({ status: 200, data: news });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ message: 'something went wrong', error: e });
    }
};

export const ShowNewsUrl = async (req, res) => {
    const {url} = req.params
    if (!url) {
        return res.status(401).json({message: 'url is invalid'});
    }
    const news = await prisma.t_news.findFirst({
        where: {
            url: url,
        }
    })
    res.json({status: 200, data: news})
}

export const EditNews = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }
    const {
        new_date,
        header,
        body,
        firsttext,
        lang,
        type_id,
        view,
        photo,
        foto,
        fototext,
        title,
        metakeywords,
        metadescription,
        url,
        publick,
        country,
        tags,
    } = req.body

        const currentTourType = await prisma.t_news.findUnique({
        where: {
            id: id,
        },
    });


    // Если текущий URL отличается от нового, проверяем уникальность
    if (currentTourType === null) return res.status(404).send({message: 'Page with this URL already exists'});
    if (currentTourType.url !== url) {
        const findUniqueType = await prisma.t_news.findFirst({
            where: {
                url: url,
            },
        });

        if (findUniqueType) return res.status(404).send({message: 'Page with this URL already exists'});
    }


    const news = await prisma.t_news.update({
        data: {
            new_date,
            header,
            body,
            firsttext,
            lang,
            type_id,
            view,
            photo,
            foto,
            fototext,
            title,
            metakeywords,
            metadescription,
            url,
            publick,
            country,
            tags,
        },
        where: {
            id: id,
        },
    })
    return res.json({status: 200, data: news})
}

// delete news

export const DeleteNews = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }

    const findNews = await prisma.t_news.findUnique({
        where: {
            id: id,
        },
    })

    if (!findNews)
        return res.json({status: 400, message: 'We did not find any news'})

    const news = await prisma.t_news.delete({
        where: {
            id: id,
        },
    })

    res.json({status: 200, message: 'We deleted news successfully'})
}

//check