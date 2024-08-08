import prisma from '../db/db.config.js'

export const tourCreate = async (req, res) => {
    const {
        parent,
        name,
        type,
        url,
        photo,
        description,
        title,
        metakeywords,
        metadescription,
        sorting,
    } = req.body

    const findUniqueType = await prisma.t_types.findFirst({
        where: {
            url: url
        }
    })

    if(findUniqueType) return res.status(404).send({message: 'Please enter another url'});

    let tour = await prisma.t_types.create({
        data: {
            parent,
            name,
            type,
            url,
            photo,
            description,
            title,
            metakeywords,
            metadescription,
            sorting,
        },
    })

    return res.json({status: 200, data: tour, message: 'tour created'})
}
export const tourShowAll = async (req, res) => {
    const tours = await prisma.t_types.findMany({
        include: {
            tour_type: true,
            t_tour: {
                include:{
                    type:true,
                    tourtoday:true,
                    tour_country:true,
                    tour_city:true,
                }
            },
        },
    })

    return res.json({status: 200, data: tours})
}

export const tourShow = async (req, res) => {
    const {id} = req.params
    if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

    const tours = await prisma.t_types.findUnique({
        where: {
            id: id,
        }
    })

    return res.json({status: 200, data: tours})
}

export const tourTypeShowUrl = async (req, res) => {
    const {url} = req.params
    if (!url) {
        return res.status(401).json({ message: 'url is invalid' });
    }

    const tourType = await prisma.t_types.findFirst({
        where:{
            url
        },
        include:{
            t_tour: {
                include:{
                    type:true,
                    tourtoday:true,
                    tour_country:{
                        select:{
                            country:true
                        }
                    },
                }
            }
        }
    })
    if(!tourType) return res.json({status: 404, message: 'No tour'})

    return res.json({status: 200, data: tourType})
}

export const tourEdit = async (req, res) => {
    const {id} = req.params
     if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}
    const {
        parent,
        name,
        type,
        url,
        photo,
        description,
        title,
        metakeywords,
        metadescription,
        sorting,
    } = req.body

    // Получаем текущие данные записи
    const currentTourType = await prisma.t_types.findUnique({
        where: {
            id: id,
        },
    });

    // Если текущий URL отличается от нового, проверяем уникальность
    if (currentTourType.url !== url) {
        const findUniqueType = await prisma.t_types.findFirst({
            where: {
                url: url,
            },
        });

        if (findUniqueType) return res.status(404).send({ message: 'Please enter another url' });
    }

    const tourType = await prisma.t_types.update({
        where: {
            id: id,
        },
        data: {
            parent,
            name,
            type,
            url,
            photo,
            description,
            title,
            metakeywords,
            metadescription,
            sorting,
        }
    })
    res.json({status: 200, data: tourType})
}

export const tourDelete = async (req, res) => {
    const {id} = req.params
     if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const tour_delete = await prisma.t_types.delete({
        where: {
            id: id,
        },
    })

    res.json({
        status: 200,
        message: 'tour deleted successfully',
    })
}
