import prisma from '../db/db.config.js'
import {parseISO, addDays, eachDayOfInterval} from "date-fns";

export const CreateTour = async (req, res) => {
    const {
        type_id,
        team_id,
        main_title,
        name,
        name2,
        price,
        oldPrice,
        sales,
        body,
        map,
        url,
        photo,
        metakeywords,
        metadescription,
        ftext,
        ftext2,
        intop,
        intop2,
        intop3,
        types,
        include,
        exclude,
        notes,
        paid_services,
        places,
        transport,
        travellers,
        archive,
        solo_price,
        single_price,
        guaranted,
        new_type,
        country,
        city,
    } = req.body
    const findUniqueType = await prisma.t_tour.findFirst({
        where: {
            url: url
        }
    })

    if (findUniqueType) return res.status(404).send({message: 'Page with this URL already exists'});


    try {
        // Создание тура
        const tour = await prisma.t_tour.create({
            data: {
                type_id,
                main_title,
                name,
                name2,
                price,
                oldPrice,
                sales,
                body,
                map,
                url,
                photo,
                metakeywords,
                metadescription,
                ftext,
                ftext2,
                intop,
                intop2,
                intop3,
                types,
                include,
                exclude,
                notes,
                paid_services,
                places,
                transport,
                travellers,
                archive,
                solo_price,
                single_price,
                guaranted,
                new_type,
                country,
                city,
            },
        })

        const tourTeam = await prisma.t_tour_team.create({
            data: {
                tour_id: tour.id,
                team_id: team_id
            }
        })

        res.json({status: 200, data: tour, id: tour.id})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Ошибка при создании тура или дня тура'})
    }
}

export const ShowAllTours = async (req, res) => {
    const tour = await prisma.t_tour.findMany({
        include: {
            type: true,
            tourtoday: true,
            tour_city: true,
            tour_country: {
                select: {
                    country: true
                }
            },
        }
    })

    res.json({status: 200, data: tour})
}

export const ShowTour = async (req, res) => {
    const {id} = req.params
    if (!id && id === undefined) return res.status(401).json({message: 'id is invalid'})
    const tour = await prisma.t_tour.findUnique({
        where: {
            id: id,

        },
        include: {
            tour_faqs: true,
            tourtoday: true,
            tourphoto: true,
            tour_country: true,
            tour_city: true,
            type: true,
            tour_day_price: true,
            tour_team: true,
        }
    })

    if (!tour)
        return res.json({status: 400, message: 'We could not find any tour'})

    res.json({status: 200, data: tour})
}

export const ShowTourByUrl = async (req, res) => {
    const {tourUrl} = req.params
    if (!tourUrl) {
        return res.status(401).json({tourUrl: 'tourUrl is invalid'});
    }
    const findTour = await prisma.t_tour.findFirst({
        where: {
            url: tourUrl,
        },
        include: {
            tour_day_price: true,
            tourtoday: true,
            type: true,
            tourphoto: true,
            tour_faqs: {
                include: {
                    faq: true
                }
            },
            tour_team: true,
            tour_country: true,
            tour_city: {
                select: {
                    city: true
                }
            }
        }
    })
    if (!findTour) {
        return res.json({status: 400, message: 'We could not find any tour'})
    }
    return res.json({status: 200, data: findTour})
}

export const EditTour = async (req, res) => {
    const {id} = req.params;
    if (!id && id === undefined) return res.status(401).json({message: 'id is invalid'})

    // const id = req.params.id
    const {
        type_id,
        team_id,
        main_title,
        name,
        name2,
        price,
        oldPrice,
        sales,
        body,
        map,
        url,
        photo,
        metakeywords,
        metadescription,
        ftext,
        ftext2,
        intop,
        intop2,
        intop3,
        types,
        include,
        exclude,
        notes,
        paid_services,
        places,
        transport,
        travellers,
        archive,
        solo_price,
        single_price,
        guaranted,
        new_type,
        country,
        city,
        tourtoday,
        faqIds,
        tourphoto,
        tour_day_price
    } = req.body;

    const tourTypes = await prisma.t_types.findUnique({
        where: {
            id: String(type_id)
        }
    })

    if (!tourTypes) {
        return res.status(400).json({message: 'Invalid type_id'});
    }

    const currentTourType = await prisma.t_tour.findUnique({
        where: {
            id: id,
        },
    });

    // Если текущий URL отличается от нового, проверяем уникальность
    if (currentTourType.url !== url) {
        const findUniqueType = await prisma.t_tour.findFirst({
            where: {
                url: url,
            },
        });

        if (findUniqueType) return res.status(404).send({message: 'Page with this URL already exists'});
    }

    try {
        const tour = await prisma.t_tour.update({
            where: {
                id: id
            },
            data: {
                type_id,
                main_title,
                name,
                name2,
                price,
                oldPrice,
                sales,
                body,
                map,
                url,
                photo,
                metakeywords,
                metadescription,
                ftext,
                ftext2,
                intop,
                intop2,
                intop3,
                types,
                include,
                exclude,
                notes,
                paid_services,
                places,
                transport,
                travellers,
                archive,
                solo_price,
                single_price,
                guaranted,
                new_type,
                country,
                city,
            },
        });

        const teamTourId = await prisma.t_tour_team.findFirst({
            where: {
                tour_id: id
            }
        });

        if (teamTourId !== null) {
            const teamExists = await prisma.t_team.findUnique({
                where: {id: team_id}
            });

            if (teamExists) {
                await prisma.t_tour_team.update({
                    data: {
                        tour_id: id,
                        team_id: team_id
                    },
                    where: {
                        id: teamTourId.id
                    }
                });
            } else {
                return res.status(400).json({message: 'Invalid team_id'});
            }
        }


        // Create t_tour_day_price entries for each day in the date range
        for (const tdp of tour_day_price) {
            const dateStart = parseISO(tdp.date_start);
            const dateEnd = parseISO(tdp.date_end);

            // Generate dates in the range from dateStart to dateEnd
            const datesInRange = eachDayOfInterval({start: dateStart, end: dateEnd});

            for (const date of datesInRange) {
                const existingTourDayPrice = await prisma.t_tour_day_price.findFirst({
                    where: {
                        tourid: id,
                        date_start: date.toISOString(),
                    }
                });

                if (existingTourDayPrice) {
                    // Если запись существует, обновляем её
                    await prisma.t_tour_day_price.update({
                        where: {
                            id: existingTourDayPrice.id,
                        },
                        data: {
                            double_price: tdp.double_price,
                            single_price: tdp.single_price,
                            transferprice: tdp.transferprice,
                        }
                    });
                } else {
                    // Если записи с такой датой нет, создаем новую
                    await prisma.t_tour_day_price.create({
                        data: {
                            tourid: id,
                            date_start: date.toISOString(),
                            date_end: addDays(date, tourtoday.length).toISOString(),
                            double_price: tdp.double_price,
                            single_price: tdp.single_price,
                            transferprice: tdp.transferprice,
                        }
                    });
                }
            }
        }


        for (const c of city) {
            const existingCity = await prisma.t_tourcity.findFirst({
                where: {
                    cityid: c,
                    tourid: id
                }
            });

            if (!existingCity) {
                await prisma.t_tourcity.create({
                    data: {
                        tourid: id,
                        cityid: c
                    }
                });
            }
        }

        for (const c of country) {
            const existingCountry = await prisma.t_tour_country.findFirst({
                where: {
                    country_id: c,
                    tour_id: id
                }
            });

            if (!existingCountry) {
                await prisma.t_tour_country.create({
                    data: {
                        tour_id: id,
                        country_id: c
                    }
                });
            }
        }

        for (const faq of faqIds) {
            const existingFaq = await prisma.t_tour_faqs.findFirst({
                where: {
                    faqid: faq,
                    tourid: id
                }
            });

            if (!existingFaq) {
                await prisma.t_tour_faqs.create({
                    data: {
                        tourid: id,
                        faqid: faq
                    }
                });
            }
        }

        for (const photo of tourphoto) {
            const existingRecords = await prisma.t_tourphoto.findUnique({
                where: {
                    id: photo.id,
                    tourid: id
                }
            });


            if (existingRecords) {
                // Если записи существуют, обновляем их
                await prisma.t_tourphoto.updateMany({
                    where: {id: photo.id},
                    data: {
                        tourid: id,
                        photo: photo.photo,
                    },
                });
            } else {

                // Если записи не существуют, создаем новые
                await prisma.t_tourphoto.createMany({
                    skipDuplicates: true,
                    data: {
                        tourid: id,
                        photo: photo.photo,
                    },
                });
            }
        }

        // TourToday model
        for (const t of tourtoday) {
            // Проверяем, существует ли запись с указанным tourid
            const existingRecords = await prisma.t_tourtoday.findUnique({
                where: {
                    id: String(t.id),
                    tourid: id
                }
            });


            if (existingRecords) {
                // Если записи существуют, обновляем их
                await prisma.t_tourtoday.updateMany({
                    where: {id: t.id},
                    data: {
                        name: t.name,
                        body: t.body,
                        breakfast: Number(t.breakfast),
                        lunch: Number(t.lunch),
                        dinner: Number(t.dinner),
                        hotels: t.hotels,
                        tourid: id
                    },
                });
            } else {
                // Если записи не существуют, создаем новые
                await prisma.t_tourtoday.createMany({
                    skipDuplicates: true,
                    data: {
                        name: t.name,
                        body: t.body,
                        breakfast: t.breakfast,
                        lunch: t.lunch,
                        dinner: t.dinner,
                        hotels: t.hotels,
                        tourid: id,
                    },
                });
            }
        }


        return res.json({status: 200, data: tour});
    } catch (error) {
        console.error('Error updating or creating records:', error);
        res.status(500).json({error: 'An error occurred while updating or creating records.'});
    }
};

// controller for deleting tourToday

export const DeleteTourToday = async (req, res) => {
    const {id} = req.params;
    if (!id && id === undefined) return res.status(401).json({message: 'id is invalid'})

    const tourToday = await prisma.t_tourtoday.findUnique({
        where: {
            id: id,
        },
    })

    if (!tourToday)
        return res.json({status: 400, message: 'We could not find this tourToday'})

    const deletedTourToday = await prisma.t_tourtoday.delete({
        where: {
            id: id,
        },
    })

    res.json({
        status: 200,
        message: 'Tour deleted successfully',
        data: deletedTourToday,
    })
}

// controller for deleting tour
export const DeleteTour = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }


    const tour = await prisma.t_tour.findUnique({
        where: {
            id: id,
        },
    })

    if (!tour)
        return res.json({status: 400, message: 'We could not find this tour'})


    const deletedTour = await prisma.t_tour.delete({
        where: {
            id: id,
        },
    })

    res.json({
        status: 200,
        message: 'Tour deleted successfully',
        data: deletedTour,
    })
}

// controller for deleting tourFaq

export const DeleteTourFaq = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }

    const faqUnique = await prisma.t_tour_faqs.findUnique({
        where: {
            id: id,
        }
    })
    if (!faqUnique) return res.json({status: 400, message: 'We could not find this faq'})

    const faq = await prisma.t_tour_faqs.delete({
        where: {
            id: id,
        }
    })

    res.json({status: 200, data: faq})
}

export const DeleteTourImages = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }

    const tourUnique = await prisma.t_tourphoto.findUnique({
        where: {
            id: id,
        }
    })
    if (!tourUnique) return res.json({status: 400, message: 'We could not find this hotel rooms'})

    const tourPhoto = await prisma.t_tourphoto.delete({
        where: {
            id: id,
        }
    })

    res.json({status: 200, data: tourPhoto})
}

export const DeleteTourCountry = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }

    const countryUnique = await prisma.t_tour_country.findFirst({
        where: {
            id: id,
        }
    })
    if (!countryUnique) return res.json({status: 400, message: 'We could not find this tour country'})

    const countryTour = await prisma.t_tour_country.delete({
        where: {
            id: id,
        }
    })

    res.json({status: 200, data: countryTour})
}

export const DeleteTourCity = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }

    const cityUnique = await prisma.t_tourcity.findUnique({
        where: {
            id: id,
        }
    })
    if (!cityUnique) return res.json({status: 400, message: 'We could not find this tour country'})

    const cityTour = await prisma.t_tourcity.delete({
        where: {
            id: id,
        }
    })

    res.json({status: 200, data: cityTour})
}

export const DeleteTourDayPrice = async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(401).json({message: 'id is invalid'});
    }

    try {
        const tourDayPrice = await prisma.t_tour_day_price.delete({
            where: {
                id: id,
            }
        })
        res.json({status: 200, data: tourDayPrice})

    } catch (err) {
        res.json({status: 400, message: 'We could not find this tour day price'})
    }
}