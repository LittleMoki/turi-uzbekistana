import prisma from '../db/db.config.js'

export const CreateCountry = async (req, res) => {
	const {
		language_id,
		name,
		url,
		description,
		title,
		metadescription,
		metakeywords,
		photo,
	} = req.body

	const findUniqueType = await prisma.t_country.findFirst({
		where: {
			url: url
		}
	})

	if(findUniqueType) return res.status(404).send({message: 'Page with this URL already exists'});


	const country = await prisma.t_country.create({
		data: {
			language_id,
			name,
			url,
			description,
			title,
			metadescription,
			metakeywords,
			photo,
		},
	})
	return res.json({
		status: 200,
		message: 'Country created successfully',
		data: country,
	})
}

export const ShowAllCountries = async (req, res) => {
	const countries = await prisma.t_country.findMany({
		include:{
			tour_country:true
		}
	})

	if (!countries)
		return res.json({ status: 400, message: 'We did not find any countries' })

	return res.json({ status: 200, data: countries })
}

export const ShowCountry = async (req, res) => {
	const { id } = req.params
	if(!id && id === undefined) return res.status(401).json({message:'id is invalid'})

	const findCountry = await prisma.t_country.findUnique({
		where: {
			id: id,
		},
	})

	if (!findCountry)
		return res.json({ status: 400, message: 'We did not find this country' })

	return res.json({ status: 200, data: findCountry })
}

export const ShowCountryUrl = async (req, res) => {
	const { url } = req.params
	if (!url) {
        return res.status(401).json({ url: 'url is invalid' });
    }

	const country = await prisma.t_country.findFirst({
		where:{
			url
		}
	})
	res.json({status:200,data:country})
}

export const EditCountry = async (req, res) => {
	const { id } = req.params
	if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

	const {
		language_id,
		name,
		url,
		description,
		title,
		metadescription,
		metakeywords,
		photo,
	} = req.body

	const findCountry = await prisma.t_country.findUnique({
		where: {
			id: id,
		},
	})

	if (findCountry.url !== url) {
		const findCountry = await prisma.t_country.findFirst({
			where: {
				url: url,
			},
		});

		if (findCountry) return res.status(404).send({ message: 'Page with this URL already exists' });
	}



	if (!findCountry)
		return res.json({ status: 400, message: 'We did not find this country' })

	const editCountry = await prisma.t_country.update({
		where: {
			id: id,
		},
		data: {
			language_id,
			name,
			url,
			description,
			title,
			metadescription,
			metakeywords,
			photo,
		},
	})

	return res.json({
		status: 200,
		message: 'Country is edited successfully',
		data: editCountry,
	})
}

export const DeleteCountry = async (req, res) => {
	const { id } = req.params
	if (!id) {
		return res.status(401).json({ message: 'id is invalid' });
	}

	const deleteCountry = await prisma.t_country.delete({
		where: {
			id: id,
		},
	})

	return res.json({
		status: 200,
		message: 'We deleted country successfully',
		data: deleteCountry,
	})
}
