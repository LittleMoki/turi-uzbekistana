'use client'
import { api } from '@/Api/api'
import CustomButton from '@/UI/CustomButton'
import CustomInput from '@/UI/CustomInput'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import {Card, CardBody, DatePicker, Select, SelectItem, Tab, Tabs} from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CustomEditor from "@/UI/CustomEditor.jsx";
import Image from "next/image";
import {object, string} from "yup";

const AdminNews = () => {
	let defaultDate = today(getLocalTimeZone())
	const router = useRouter()
	const { id, newsId } = useParams()
	// State to hold selected date
	const [country, setCountry] = useState([])
	const [formData, setFormData] = useState({
		new_date: defaultDate, // Initialize with a default date
		header: '',
		body: '',
		firsttext: '',
		lang: '',
		type_id: newsId,
		view: 0,
		photo: '',
		foto: '',
		fototext: '',
		title: '',
		metakeywords: '',
		metadescription: '',
		url: '',
		publick: 0,
		country: '',
		tags: null,
	})
	const [errors, setErrors] = useState({});

	const [selectedDate, setSelectedDate] = useState(
		formData.new_date ? formData.new_date : defaultDate
	)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await api.get('/country')
				setCountry(data.data)

				if (id) {
					const { data } = await api.get(`/news/${id}`)
					const {
						header,
						body,
						firsttext,
						lang,
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
						new_date,
					} = data.data
					setFormData({
						new_date: new_date,
						header: header || '',
						body: body || '',
						firsttext: firsttext || '',
						lang: lang || '',
						type_id: newsId,
						view: view || 0,
						photo: photo || '',
						foto: foto || '',
						fototext: fototext || '',
						title: title || '',
						metakeywords: metakeywords || '',
						metadescription: metadescription || '',
						url: url || '',
						publick: publick || 0,
						country: country || '',
						tags: tags || null,
					})
					setSelectedDate(new_date ? parseDate(new_date) : defaultDate)
				}
			} catch (error) {
				console.error(error.message)
			}
		}

		fetchData()
	}, [id, newsId])

	const handleInputChange = e => {
		if (!e.target) return // Add a safeguard to handle unexpected event objects

		const { name, value, type, checked } = e.target

		setFormData(prevState => ({
			...prevState,
			[name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
		}))
	}

	const handleSelectChange = (keys, type) => {
		setFormData(prevState => ({
			...prevState,
			[type]: [...keys][0],
		}));
	};

	const handleEditorChange = (name, value) => {
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		if(e!== undefined)e.preventDefault()
		try {
			await newsSchema.validate(formData, {abortEarly: false})
			if (id) {
				await api.put(`/news/${id}`, formData)
			} else {
				await api.post('/news', {
					...formData,
					new_date: `${defaultDate.year}-${
						defaultDate.month < 10 ? `0${defaultDate.month}` : defaultDate.month
					}-${defaultDate.day < 10 ? `0${defaultDate.day}` : defaultDate.day}`,
				})
			}
			router.push(`/admin/news/${newsId}`)
		} catch (error) {
			const newErrors = {};

			error?.inner?.forEach((err) => {
				newErrors[err.path] = err.message;
			});
			if (error?.response?.data?.message) {
				newErrors['url'] = error?.response?.data?.message;
			}
			setErrors(newErrors);
		}
	}
	const handleDateChange = newDate => {
		setSelectedDate(newDate)
		setFormData(prevState => ({
			...prevState,
			new_date: `${newDate.year}-${
				newDate.month < 10 ? `0${newDate.month}` : newDate.month
			}-${newDate.day < 10 ? `0${newDate.day}` : newDate.day}`,
		}))

		// Optionally, you can update formData.new_date here as well
	}

	const handleImageChange = async (img) => {
		const formDataImage = new FormData();
		formDataImage.append('file', img);
		formDataImage.append('oldPhotoName', formData.photo || ''); // Передаем старое имя файла для удаления
		try {
			const response = await api.post('/upload', formDataImage);
			const newPhotoLocation = response.data.location; // URL новой фотографии

			// Обновляем состояние с новым именем файла
			setFormData((prevState) => ({
				...prevState,
				'photo': newPhotoLocation, // Обновляем поле photo с новым именем файла
			}));

			router.push(`/admin/${slug}/edit/${id}`);
		} catch (error) {
			console.error('Ошибка загрузки изображения:', error);
		}
	};

	const newsSchema = object({
		header:string().required('Please enter header of news'),
		url:string().required('Please enter url of news'),
		country:string().min(1,'Please choose a country').required('Please choose a country'),
		type_id:string().required('Please choose a type'),
	})

	return (
		<div className='flex w-full dark flex-col'>
			<Tabs aria-label='Options'>
				<Tab key='settings' title='Общие настройки'>
					<Card>
						<CardBody>
							<form
								className='flex flex-col gap-3 items-start'
								onSubmit={handleSubmit}
							>
								<DatePicker
									className='max-w-[284px]'
									label='Дата статьи:'
									value={selectedDate}
									onChange={handleDateChange}
									description='Нажми на иконку чтобы открыть календарь'
								/>
								<CustomInput
									name='header'
									value={formData.header || ''}
									fn={handleInputChange}
									label='Заголовок :'
									white='true'
									error={errors.header}
								/>
								<CustomInput
									name='title'
									value={formData.title || ''}
									fn={handleInputChange}
									label='Описание в заголовке (title) :'
									white='true'
								/>
								<CustomInput
									name='metakeywords'
									value={formData.metakeywords || ''}
									fn={handleInputChange}
									label='Описание в заголовке (metakeywords) :'
									white='true'
								/>
								<CustomInput
									name='metadescription'
									value={formData.metadescription || ''}
									fn={handleInputChange}
									label='Описание в заголовке (metadescription):'
									white='true'
								/>
								<CustomInput
									name='url'
									value={formData.url || ''}
									fn={handleInputChange}
									label='Адрес статьи (URL) :'
									white='true'
									error={errors.url}
									smallText='Не пишите одинаковые ссылки'
								/>
								<Select
									label="Выберите страну"
									placeholder="Выберите страну"
									selectedKeys={new Set([formData.country])}
									className="w-full"
									errorMessage={errors.country}
									isInvalid={errors.country}
									name='country'
									onSelectionChange={(keys) => handleSelectChange(keys, 'country')}
								>
									{country.map(el => (
										<SelectItem key={el.name} value={el.name}>
											{el.name}
										</SelectItem>
									))}
								</Select>
								<CustomInput
									name='tags'
									value={formData.tags || ''}
									fn={handleInputChange}
									label='Метки:'
									white='true'
								/>
								<label className='flex gap-2'>
									<input
										type='checkbox'
										name='publick'
										checked={formData.publick === 1}
										onChange={handleInputChange}
									/>
									Опубликовать на сайте?
								</label>
								<CustomButton type='submit'>Save</CustomButton>
							</form>
						</CardBody>
					</Card>
				</Tab>
				<Tab key='description' title='Описание'>
					<Card>
						<CardBody>
							<form
								className='flex flex-col gap-3 items-start'
								onSubmit={handleSubmit}
							>
								<CustomInput
									name='firsttext'
									value={formData.firsttext || ''}
									fn={handleInputChange}
									label='Краткий анонс:'
									white='true'
								/>
								<label className='w-full text-white'>
									Содержание страницы:
									<CustomEditor
										id='body'
										fn={handleEditorChange}
										name='body'
										value={formData.body}
									/>
								</label>
								<CustomButton type='submit'>Save</CustomButton>
							</form>
						</CardBody>
					</Card>
				</Tab>
				<Tab key='photos' title='Изображение'>
					<Card>
						<CardBody>
							<form onSubmit={handleSubmit}>
								<label className='text-white flex flex-col gap-3 w-full'>
									Фото
									<input
										className='bg-white w-full py-3	px-2 rounded-xl cursor-pointer'
										name='photo'
										type='file'
										onChange={(e) => handleImageChange(e.target.files[0])}
									/>
									Файл изображения должен быть в формате JPG или PNG
									{formData.photo ? (
										<Image
											width={'500'}
											height={'500'}
											alt={formData.photo}
											src={`https://api.turi-uzbekistana.ru/uploads/${formData.photo}`
											}
										/>
									) : ''}
								</label>
								<CustomButton type='submit'>Save</CustomButton>
							</form>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	)
}

export default AdminNews
