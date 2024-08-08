import prisma from '../db/db.config.js'

export const CreateCity = async (req, res) => {
	const {
		country_id,
		name,
		url,
		body,
		map,
		photo,
		metakeywords,
		metadescription,
		title,
	} = req.body

	// Проверка существования country_id
	const countryExists = await prisma.t_country.findUnique({
		where: {
			id: country_id,
		},
	});

	if (!countryExists) {
		return res.status(400).json({ status: 400, country_id: 'Country ID does not exist' });
	}

	const findPage = await prisma.t_city.findFirst({
		where: {
			url: url,
		},
	});

	if (findPage) {
		return res.status(400).json({ status: 400, message: 'Page with this URL already exists' });
	}

	const city = await prisma.t_city.create({
		data: {
			country_id,
			name,
			url,
			body,
			map,
			photo,
			metakeywords,
			metadescription,
			title,
		},
	})
	return res.json({
		status: 200,
		message: 'City created successfully',
		data: city,
	})
}

export const ShowAllCities = async (req, res) => {
	const cities = await prisma.t_city.findMany({
		include: {
			t_place:true,
			tourcity:true,
			country: true,
			_count:{
				select:{
					t_place:true
				}
			}
		},
	})

	if (!cities)
		return res.json({ status: 400, message: 'We did not find any cities' })

	return res.json({ status: 200, data: cities })
}

export const ShowCity = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const findCity = await prisma.t_city.findUnique({
		where: {
			id: id,
		},
	})

	if (!findCity)
		return res.json({ status: 400, message: 'We did not find this city' })

	return res.json({ status: 200, data: findCity })
}

export  const ShowCityUrl = async (req, res) => {
	const { url } = req.params
	if (!url) {
        return res.status(401).json({ url: 'url is invalid' });
    }

	const city = await prisma.t_city.findFirst({
		where:{
			url:url
		}
	})
	res.status(200).json({ status: 200, data: city })
}

export const EditCity = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const {
		country_id,
		name,
		url,
		body,
		map,
		photo,
		metakeywords,
		metadescription,
		title,
	} = req.body

	const findCity = await prisma.t_city.findUnique({
		where: {
			id: id,
		},
	})

	if (!findCity)
		return res.json({ status: 400, message: 'We did not find this city' })

	const editCity = await prisma.t_city.update({
		where: {
			id: id,
		},
		data: {
			country_id,

			name,
			url,
			body,
			map,
			photo,
			metakeywords,
			metadescription,
			title,
		},
	})

	return res.json({
		status: 200,
		message: 'City is edited successfully',
		data: editCity,
	})
}

export const DeleteCity = async (req, res) => {
	const { id } = req.params
	if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

	const deleteCity = await prisma.t_city.delete({
		where: {
			id: id,
		},
	})

	return res.json({
		status: 200,
		message: 'We deleted city successfully',
		data: deleteCity,
	})
}
