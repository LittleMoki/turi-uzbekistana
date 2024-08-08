import prisma from '../db/db.config.js'

export const CreatePlace = async (req, res) => {
    const {
        country_id,
        cityid,
        url,
        name,
        body,
        photo,
        foto,
        fotoext,
        metakeywords,
        metadescription,
        publics,
    } = req.body


    const findPage = await prisma.t_place.findFirst({
        where: {
            url: url,
        },
    });

    if (findPage) {
        return res.status(400).json({status: 400, message: 'Page with this URL already exists'});
    }


    const place = await prisma.t_place.create({
        data: {
            country_id,
            cityid,
            url,
            name,
            body,
            photo,
            foto,
            fotoext,
            metakeywords,
            metadescription,
            publics,
        },
    })

    return res.json({
        status: 200,
        data: place,
    })
}

export const ShowAllPlace = async (req, res) => {
    const places = await prisma.t_place.findMany({
        include: {
            city: true
        }
    })

    if (!places)
        return res.json({status: 400, message: 'We did not find any places'})

    return res.json({status: 200, data: places})
}

export const ShowPlace = async (req, res) => {
    const {id} = req.params
    if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

    const findPlace = await prisma.t_place.findUnique({
        where: {
            id: id,
        },
    })

    if (!findPlace)
        return res.json({status: 400, message: 'We did not find this places'})

    return res.json({status: 200, data: findPlace})
}

export const ShowPlaceUrl = async (req, res) => {
    const {url} = req.params
    if (!url) {
        return res.status(401).json({ message: 'url is invalid' });
    }
    const place = await prisma.t_place.findFirst({
        where: {
            url
        },
        include: {
            country: true,
            city: true
        }
    })
    res.json({status: 200, data: place})
}

export const EditPlace = async (req, res) => {
    const {id} = req.params
    if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}
    const {
        country_id,
        cityid,
        url,
        name,
        body,
        photo,
        foto,
        fotoext,
        metakeywords,
        metadescription,
        publics,
    } = req.body

    const findPlace = await prisma.t_place.findUnique({
        where: {
            id: id,
        },
    })

    if (!findPlace)
        return res.json({status: 400, message: 'We did not find this places'})

    const EditPlace = await prisma.t_place.update({
        where: {
            id: id,
        },
        data: {
            country_id,
            cityid,
            url,
            name,
            body,
            photo,
            foto,
            fotoext,
            metakeywords,
            metadescription,
            publics,
        },
    })

    return res.json({
        status: 200,
        message: 'Place is edited successfully',
        data: EditPlace,
    })
}

export const DeletePlace = async (req, res) => {
    const {id} = req.params
    if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const deletePlace = await prisma.t_place.delete({
        where: {
            id: id,
        },
    })

    return res.json({status: 200, message: 'We deleted places successfully'})
}
