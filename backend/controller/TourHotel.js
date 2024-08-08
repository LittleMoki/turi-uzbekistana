import prisma from '../db/db.config.js'

export const CreateHotel = async (req, res) => {
    const {
        country_id,
        cityid,
        name,
        url,
        title,
        metakeywords,
        metadescription,
        rating,
        address,
        photo,
        body,
        map,
        services,
        service_text,
        conditions,
        publics,
        booking_rating,
    } = req.body
    // Проверка, существует ли страница с таким URL
    const findPage = await prisma.t_hotel.findFirst({
        where: {
            url: url,
        },
    });

    if (findPage) {
        return res.status(400).json({status: 400, message: 'Page with this URL already exists'});
    }

    const hotel = await prisma.t_hotel.create({
        data: {
            country_id,
            cityid,
            name,
            url,
            title,
            metakeywords,
            metadescription,
            rating,
            address,
            photo,
            body,
            map,
            services,
            service_text,
            conditions,
            publics,
            booking_rating
        },
    })

    return res.json({status: 200, data: hotel, id: hotel.id})
}

export const ShowAllHotels = async (req, res) => {
    const hotels = await prisma.t_hotel.findMany({
        include: {
            hotel_rooms:true
        }
    })

    if (!hotels)
        return res.json({status: 400, message: 'We did not find any hotels'})

    return res.json({status: 200, data: hotels})
}

export const ShowHotel = async (req, res) => {
    const {id} = req.params
    if (!id ) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const findHotel = await prisma.t_hotel.findUnique({
        where: {
            id: id,
        },
        include: {
            hotel_rooms: true,
            hotel_photo:true
        }
    })

    if (!findHotel)
        return res.json({status: 400, message: 'We did not find this hotel'})

    return res.json({status: 200, data: findHotel})
}

export const EditHotel = async (req, res) => {
    const {id} = req.params
    if (!id ) {
		return res.status(401).json({ message: 'id is invalid' });
	}
    const {
        country_id,
        cityid,
        name,
        url,
        title,
        metakeywords,
        metadescription,
        rating,
        address,
        photo,
        body,
        map,
        services,
        service_text,
        conditions,
        publics,
        booking_rating,
        hotel_rooms,
        hotel_photo
    } = req.body

    const currentTourType = await prisma.t_hotel.findUnique({
        where: {
            id: id,
        },
    });

    // Если текущий URL отличается от нового, проверяем уникальность
    if (currentTourType.url !== url) {
        const findUniqueType = await prisma.t_hotel.findFirst({
            where: {
                url: url,
            },
        });

        if (findUniqueType) return res.status(404).send({message: 'Page with this URL already exists'});
    }

    const findHotel = await prisma.t_hotel.findUnique({
        where: {
            id: id,
        },
    })

    if (!findHotel)
        return res.json({status: 400, message: 'We did not find this hotel'})

    const editHotel = await prisma.t_hotel.update({
        where: {
            id: id,
        },
        data: {
            country_id,
            cityid,
            name,
            url,
            title,
            metakeywords,
            metadescription,
            rating,
            address,
            photo,
            body,
            map,
            services,
            service_text,
            conditions,
            publics,
            booking_rating,

        },
    })

    for(const photo of hotel_photo){
    const existingRecords = await prisma.t_hotel_photo.findUnique({
            where: {
                id: photo.id,
                hotelid: id
            }
        });


        if (existingRecords) {
            // Если записи существуют, обновляем их
            await prisma.t_hotel_photo.updateMany({
                where: {id: photo.id},
                data: {
                    hotelid: id,
                    alt:photo.alt,
                    photo:photo.photo,
                },
            });
        } else {

            // Если записи не существуют, создаем новые
            await prisma.t_hotel_photo.createMany({
                skipDuplicates: true,
                data: {
                    hotelid: id,
                    alt:photo.alt,
                    photo:photo.photo,
                },
            });
        }
    }

    for (const hotel of hotel_rooms) {
        // Проверяем, существует ли запись с указанным hotelid
        const existingRecords = await prisma.t_hotel_rooms.findUnique({
            where: {
                id: hotel.id,
                hotelid: id
            }
        });


        if (existingRecords) {
            // Если записи существуют, обновляем их
            await prisma.t_hotel_rooms.updateMany({
                where: {id: hotel.id},
                data: {
                    hotelid: id,
                    name: hotel.name,
                    price: hotel.price,
                    sizem: hotel.sizem,
                    body: hotel.body,
                    breakfast: hotel.breakfast,
                    lunch: hotel.lunch,
                    dinner: hotel.dinner,
                    p_person: hotel.p_person,
                },
            });
        } else {

            // Если записи не существуют, создаем новые
            await prisma.t_hotel_rooms.createMany({
                skipDuplicates: true,
                data: {
                    hotelid: id,
                    name: hotel.name,
                    price: hotel.price,
                    sizem: hotel.sizem,
                    body: hotel.body,
                    breakfast: hotel.breakfast,
                    lunch: hotel.lunch,
                    dinner: hotel.dinner,
                    p_person: hotel.p_person,
                },
            });
        }
    }

    return res.json({
        status: 200,
        message: 'Hotel is edited successfully',
        data: editHotel,
    })
}

export const DeleteHotel = async (req, res) => {
    const {id} = req.params
    if (!id ) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const deleteHotel = await prisma.t_hotel.delete({
        where: {
            id: id,
        },
    })

    return res.json({status: 200, message: 'We deleted hotel successfully'})
}

export const DeleteHotelRooms = async (req, res) => {
    const {id} = req.params
    if (!id ) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const hotelRoomsUnique = await prisma.t_hotel_rooms.findUnique({
        where: {
            id: id,
        }
    })
    if (!hotelRoomsUnique) return res.json({status: 400, message: 'We could not find this hotel rooms'})

    const hotelRooms = await prisma.t_hotel_rooms.delete({
        where: {
            id: id,
        }
    })

    res.json({status: 200, data: hotelRooms})
}

export const DeleteHotelPhoto = async (req,res)=>{
    const {id} = req.params
    if (!id ) {
		return res.status(401).json({ message: 'id is invalid' });
	}

    const hotelRoomsUnique = await prisma.t_hotel_photo.findUnique({
        where: {
            id: id,
        }
    })
    if (!hotelRoomsUnique) return res.json({status: 400, message: 'We could not find this hotel rooms'})

    const hotelRooms = await prisma.t_hotel_photo.delete({
        where: {
            id: id,
        }
    })

    res.json({status: 200, data: hotelRooms})
}