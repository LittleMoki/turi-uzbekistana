import {api} from '@/Api/api.js'
import CustomButton from '@/UI/CustomButton.jsx'
import CustomEditor from '@/UI/CustomEditor.jsx'
import CustomInput from '@/UI/CustomInput.jsx'
import {getLocalTimeZone, today} from '@internationalized/date'
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Checkbox,
    CheckboxGroup,
    RangeCalendar,
    Select,
    SelectItem,
    Tab,
    Tabs,
    Textarea,
} from '@nextui-org/react'
import {format} from 'date-fns'
import {ru} from 'date-fns/locale'
import Image from 'next/image'
import {useParams, usePathname, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {number, object, string} from 'yup'

const AdminMainTour = () => {
    const router = useRouter()
    const pathName = usePathname()
    const {id, slug} = useParams()
    const [team, setTeam] = useState([])
    const [type, setType] = useState([])
    const [country, setCountry] = useState([])
    const [city, setCity] = useState([])
    const [services, setServices] = useState([])
    const [hotel, setHotel] = useState([])
    const [formData, setFormData] = useState({
        type_id: 0,
        team_id: '0',
        main_title: '',
        name: '',
        name2: '',
        price: 0,
        oldprice: 0,
        sales: '',
        body: '',
        map: '',
        url: '',
        photo: '',
        date: '',
        metakeywords: '',
        metadescription: '',
        ftext: '',
        ftext2: '',
        intop: 0,
        intop2: 0,
        intop3: 0,
        types: [],
        include: [],
        exclude: [],
        notes: '',
        paid_services: '',
        places: '',
        transport: [],
        travellers: '',
        archive: 0,
        solo_price: 0,
        single_price: 0,
        guaranted: 0,
        new_type: '',
        country: [],
        city: [],
        tourtoday: [],
        tour_faqs: [],
        faqIds: [],
        tourphoto: [],
        tour_day_price: [],
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataTeam = await api.get(`/team`)
                const dataType = await api.get(`/tour_type`)
                const dataCountry = await api.get(`/country`)
                const dataCity = await api.get(`/city`)
                const dataServices = await api.get(`/services`)
                const dataFaq = await api.get(`/faq`)
                const dataHotel = await api.get(`/hotel`)
                setTeam(dataTeam.data.data)
                setType(dataType.data.data)
                setCountry(dataCountry.data.data)
                setCity(dataCity.data.data)
                setServices(dataServices.data.data)
                setHotel(dataHotel.data.data)

                if (id) {
                    const {data} = await api.get(`/tour/${id}`)
                    const {
                        type_id,
                        main_title,
                        name,
                        name2,
                        price,
                        oldprice,
                        sales,
                        body,
                        map,
                        url,
                        photo,
                        // date,
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
                        tour_faqs,
                        tourphoto,
                        tour_day_price,
                    } = data.data

                    setFormData({
                        team_id: data.data.type_id || '0',
                        type_id: type_id || 0,
                        main_title: main_title || '',
                        name: name || '',
                        name2: name2 || '',
                        price: price || 0,
                        oldprice: oldprice || 0,
                        sales: sales || '',
                        body: body || '',
                        map: map || '',
                        url: url || '',
                        photo: photo || '',
                        // date: date || '',
                        metakeywords: metakeywords || '',
                        metadescription: metadescription || '',
                        ftext: ftext || '',
                        ftext2: ftext2 || '',
                        intop: intop || 0,
                        intop2: intop2 || 0,
                        intop3: intop3 || 0,
                        types: types || [],
                        include: include || [],
                        exclude: exclude || [],
                        notes: notes || '',
                        paid_services: paid_services || '',
                        places: places || '',
                        transport: transport || [],
                        travellers: travellers || '',
                        archive: archive || 0,
                        solo_price: solo_price || 0,
                        single_price: single_price || 0,
                        guaranted: guaranted || 0,
                        new_type: new_type || 'i',
                        country: country || [],
                        city: city || [],
                        tourtoday: tourtoday || [],
                        tour_faqs: dataFaq.data.data || tour_faqs,
                        faqIds: (data.data.tour_faqs || []).map(faq => faq.faqid),
                        tourphoto: tourphoto || [],
                        tour_day_price: tour_day_price || [],
                    })
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchData()
    }, [id])

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]:
                name === 'price' ||
                name === 'oldprice' ||
                name === 'single_price' ||
                name === 'solo_price'
                    ? Number(value)
                    : value,
        }))
    }

    const handleInputChangeForRoutes = (index, field, value) => {
        setFormData(prevState => {
            const newTourToday = [...prevState.tourtoday]
            newTourToday[index] = {...newTourToday[index], [field]: value}
            return {...prevState, tourtoday: newTourToday}
        })
    }

    const handleImageChange = async img => {
        const formDataImage = new FormData()
        formDataImage.append('file', img)
        formDataImage.append('oldPhotoName', formData.photo || '') // Передаем старое имя файла для удаления
        try {
            const response = await api.post('/upload', formDataImage)
            const newPhotoLocation = response.data.location // URL новой фотографии

            // Обновляем состояние с новым именем файла
            setFormData(prevState => ({
                ...prevState,
                photo: newPhotoLocation, // Обновляем поле photo с новым именем файла
            }))

            router.push(`/admin/${slug}/edit/${id}`)
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error)
        }
    }

    const handleSubmit = async e => {
        if (e !== undefined) e.preventDefault()
        try {
            if (id) {
                await tourDayPriceSchema.validate(tourDayPrice, {abortEarly: false})
                await tourSchemaPut.validate(formData, {abortEarly: false})
                await api.put(`/tour/${id}`, {
                    ...formData,
                    tour_day_price: tourDayPrice.single_price > 0 ? [tourDayPrice] : [],
                })
                router.push(`/admin/${slug}`)
            } else {
                await tourSchemaPost.validate(formData, {abortEarly: false})
                const response = await api.post(`/tour`, formData)
                const id = await response.data.id
                router.push(`/admin/${slug}/edit/${id}`)
            }
        } catch (error) {
            const newErrors = {}
            error?.inner?.forEach(err => {
                newErrors[err.path] = err.message
            })
            if (error?.response?.data?.message) {
                newErrors['url'] = error?.response?.data?.message
            }
            setTourDayPriceError(newErrors)
            setErrors(newErrors)
        }
    }

    const [includeFilter, setIncludeFilter] = useState('')
    const [excludeFilter, setExcludeFilter] = useState('')
    const [countryFilter, setCountryFilter] = useState('')
    const [cityFilter, setCityFilter] = useState('')
    const [hotelFilter, setHotelFilter] = useState('')

    const filteredHotels = hotel.filter(el =>
        el.name.toLowerCase().includes(hotelFilter.toLowerCase())
    )

    const filteredIncludeServices = services.filter(
        el =>
            el.type_id == 1 &&
            el.title.toLowerCase().includes(includeFilter.toLowerCase())
    )

    const filteredExcludeServices = services.filter(
        el =>
            el.type_id == 3 &&
            el.title.toLowerCase().includes(excludeFilter.toLowerCase())
    )

    const filteredCountry = country?.filter(el =>
        el.name.toLowerCase().includes(countryFilter.toLowerCase())
    )

    const filteredCity = city?.filter(el =>
        el.name.toLowerCase().includes(cityFilter.toLowerCase())
    )

    // Состояние для хранения списка элементов аккордеона

    const addItem = () => {
        setFormData(prevState => ({
            ...prevState,
            tourtoday: [
                ...prevState.tourtoday,
                {
                    id: formData.tourtoday.length + 1,
                    tourid: id,
                    name: '',
                    body: '',
                    breakfast: false,
                    lunch: false,
                    dinner: false,
                    hotels: null,
                },
            ],
        }))
    }

    const removeItem = async id => {
        try {
            await api.delete(`/tour/${id}/tourtoday`) // Удаление элемента на сервере
            setFormData(prevState => ({
                ...prevState,
                tourtoday: prevState.tourtoday.filter(item => item.id !== id),
            }))
        } catch (error) {
            console.error(error.message)
        }
    }

    const removeFaq = async (isFaq, faqId, id) => {
        const tourFaqId = faqId.filter(el => el.faqid === id).map(el => el.id)

        if (!isFaq && tourFaqId[0] !== undefined) {
            await api.delete(`/tour/${tourFaqId[0]}/faq`)
        } // Удаление элемента на сервере
    }

    const removeTourCountry = async (isCountry, countryId) => {
        // Получаем массив id из всех объектов
        const countryIds = countryId.map(el => el['id'])
        // Если не страна и countryIds не пустой
        if (!isCountry && countryIds.length > 0) {
            for (const countryId of countryIds) {
                await api.delete(`/tour/${countryId}/country`)
            }
        }
    }

    const removeTourCity = async (isCity, cityId, id) => {
        const tourCityId = cityId.filter(el => el.cityid === id).map(el => el.id)

        if (!isCity && tourCityId[0] !== undefined) {
            await api.delete(`/tour/${tourCityId[0]}/city`)
        } // Удаление элемента на сервере
    }

    const tourSchemaPost = object({
        main_title: string().required('Please enter H1'),
        type_id: string().required('Please select a type'),
        team_id: string().required('Please select a team'),
    })

    const tourSchemaPut = object({
        main_title: string().required('Please enter H1'),
        type_id: string().min(1).required('Please select a type'),
        team_id: string().min(1).required('Please select a team'),
        name: string(),
        name2: string(),
        metakeywords: string(),
        metadescription: string(),
        url: string().required('Please enter url'),
        sales: string(),
        price: number().typeError('Must be number'),
        oldprice: number().typeError('Must be number'),
        single_price: number().typeError('Must be number'),
        solo_price: number().typeError('Must be number'),
        transfer_price: number().typeError('Must be number'),
        body: string().typeError('Must be string'),
        map: string(),
    })

    const handleUploadImage = async e => {
        const formDataUpload = new FormData()
        for (let i = 0; i < e.length; i++) {
            formDataUpload.append('files', e[i])
        }

        try {
            const response = await api.post('/uploadmany', formDataUpload)
            const uploadedPhotos = response.data.locations // Получаем массив URL загруженных файлов

            const newPhotos = uploadedPhotos.map((location, i) => ({
                id: i,
                tourid: id,
                photo: location,
            }))

            setFormData(prevState => ({
                ...prevState,
                tourphoto: [...prevState.tourphoto, ...newPhotos],
            }))

            if (id) {
                router.push(`/admin/${slug}/edit/${id}`)
            } else {
                router.push(`/admin/${slug}`)
            }
        } catch (error) {
            console.error('Ошибка загрузки файлов:', error)
        }
    }

    const handleDeleteImage = async (file, id) => {
        await api.delete(`/uploads/${file}`)
        await api.delete(`tour/${id}/images`)
        setFormData(prevState => ({
            ...prevState,
            tourphoto: prevState.tourphoto.filter(item => item.id !== id),
        }))
    }


    const filteredTourTypesCountry = type?.filter(tourType =>
        country?.some(country => country.url === tourType.url)
    )

    const seasons = ['winter', 'summer', 'spring', 'autumn', 'all_season']

    const filteredTourTypesSeason = type?.filter(tourType => {
        // Проверяем, содержит ли URL какой-либо из сезонов
        return seasons.some(season => tourType.url.includes(season))
    })
    const excludedTypes = new Set([
        ...filteredTourTypesCountry.map(type => type.id),
        ...filteredTourTypesSeason.map(type => type.id),
    ])
    const TourTypeBase = type.filter(el => !excludedTypes.has(el.id))

    const tourDayPriceSchema = object({
        double_price: number().typeError('Must be number'),
        single_price: number().typeError('Must be number'),
        transferPrice: number().typeError('Must be number'),
    })

    let defaultDate = {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()),
    }
    const [date, setDate] = useState(defaultDate)
    const [tourDayPriceError, setTourDayPriceError] = useState({})

    const formatDate = date => {
        const year = date.year
        const month = date.month.toString().padStart(2, '0')
        const day = date.day.toString().padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const dateStart = formatDate(date.start)
    const dateEnd = formatDate(date.end)

    const [tourDayPrice, setTourDayPrice] = useState({
        tourid: id,
        date_start: formatDate(defaultDate.start),
        date_end: formatDate(defaultDate.end),
        double_price: 0,
        single_price: 0,
        transferPrice: 0,
    })

    useEffect(() => {
        const dateStart = formatDate(date.start)
        const dateEnd = formatDate(date.end)
        setTourDayPrice(prevState => ({
            ...prevState,
            date_start: dateStart,
            date_end: dateEnd,
        }))
    }, [date])

    const handleDayTourPrice = (name, value) => {
        setTourDayPrice(prevState => ({
            ...prevState,
            [name]: Number(value),
        }))
    }

    const formatDateRange = (start, end) => {
        const startDate = new Date(start)
        const endDate = new Date(end)

        const startDay = format(startDate, 'd', {locale: ru})
        const startMonth = format(startDate, 'MMM', {locale: ru})
        const endDay = format(endDate, 'd', {locale: ru})
        const endMonth = format(endDate, 'MMM', {locale: ru})

        // Проверка на совпадение месяцев
        const isSameMonth = startMonth === endMonth

        return isSameMonth
            ? `${startDay} - ${endDay} ${startMonth}`
            : `${startDay} ${startMonth} - ${endDay} ${endMonth}`
    }
    const deleteTourPriceAll = async () => {

    }
    const deleteTourPrice = async id => {
        setFormData(prev => ({
            ...prev,
            tour_day_price: prev.tour_day_price.filter(el => el.id !== id),
        }))
        await api.delete(`/tour/${id}/tourDayPrice`)
    }

    return (
        <>
            {pathName.startsWith('/admin/tour/create') ? (
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <CustomInput
                        name='main_title'
                        value={formData.main_title || ''}
                        fn={e => handleInputChange('main_title', e.target.value)}
                        label='Заголовок H1:'
                        white='true'
                        error={errors.main_title}
                    />
                    <Select
                        name='type_id'
                        label='Тип тура :'
                        className='w-full'
                        isInvalid={errors.type_id}
                        errorMessage={errors.type_id}
                        selectedKeys={new Set([formData.type_id])}
                        onSelectionChange={keys => {
                            handleInputChange('type_id', keys.values().next().value)
                        }}
                    >
                        {TourTypeBase.map(el => (
                            <SelectItem key={el.id} value={el.id}>
                                {el.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label='Команда:'
                        className='w-full'
                        isInvalid={errors.team_id}
                        errorMessage={errors.team_id}
                        selectedKeys={new Set([formData.team_id])}
                        onSelectionChange={keys =>
                            handleInputChange('team_id', keys.values().next().value)
                        }
                    >
                        {team.map(el => (
                            <SelectItem key={el.id} value={el.id}>
                                {el.name}
                            </SelectItem>
                        ))}
                    </Select>

                    <CustomButton type='submit'>Save</CustomButton>
                </form>
            ) : (
                <div className='flex w-full dark flex-col'>
                    <Tabs aria-label='Options'>
                        <Tab key='settings' title='Общие настройки'>
                            <Card>
                                <CardBody>
                                    <form
                                        className='flex flex-col gap-3 items-start'
                                        onSubmit={handleSubmit}
                                    >
                                        <CustomInput
                                            name='main_title'
                                            value={formData.main_title || ''}
                                            fn={e => handleInputChange('main_title', e.target.value)}
                                            label='Заголовок H1:'
                                            white='true'
                                            error={errors.main_title}
                                        />
                                        <CustomInput
                                            name='name2'
                                            value={formData.name2 || ''}
                                            fn={e => handleInputChange('name2', e.target.value)}
                                            label='Заголовок H2:'
                                            white='true'
                                            error={errors.name2}
                                        />

                                        <CustomInput
                                            name='name'
                                            value={formData.name || ''}
                                            fn={e => handleInputChange('name', e.target.value)}
                                            label='Title:'
                                            white='true'
                                            error={errors.name}
                                        />

                                        <CustomInput
                                            name='metakeywords'
                                            value={formData.metakeywords || ''}
                                            fn={e =>
                                                handleInputChange('metakeywords', e.target.value)
                                            }
                                            label='Metakeywords:'
                                            white='true'
                                            error={errors.metakeywords}
                                        />
                                        <CustomInput
                                            name='metadescription'
                                            value={formData.metadescription || ''}
                                            fn={e =>
                                                handleInputChange('metadescription', e.target.value)
                                            }
                                            label='Metadescription:'
                                            white='true'
                                            error={errors.metadescription}
                                        />

                                        <CustomInput
                                            name='url'
                                            value={formData.url || ''}
                                            fn={e => handleInputChange('url', e.target.value)}
                                            label='Ссылка на страницу:'
                                            white='true'
                                            error={errors.url}
                                        />
                                        <Checkbox
                                            name='intop'
                                            onChange={() =>
                                                handleInputChange('intop', formData.intop === 1 ? 0 : 1)
                                            }
                                            isSelected={formData.intop === 1}
                                        >
                                            Показать на главной странице (В разделе популярные туры)
                                        </Checkbox>
                                        <small className='pl-4'>
                                            Для правильного показа туров на главной странице, надо
                                            выбрать 3 тура в одну категорию
                                        </small>
                                        <Checkbox
                                            name='guaranted'
                                            onChange={() =>
                                                handleInputChange(
                                                    'guaranted',
                                                    formData.guaranted === 1 ? 0 : 1
                                                )
                                            }
                                            isSelected={formData.guaranted === 1}
                                        >
                                            Добавить галочку (Гарантированный тур)
                                        </Checkbox>
                                        <Checkbox
                                            name='archive'
                                            onChange={() =>
                                                handleInputChange(
                                                    'archive',
                                                    formData.archive === 1 ? 0 : 1
                                                )
                                            }
                                            isSelected={formData.archive === 1}
                                        >
                                            Перенести тур в архив
                                        </Checkbox>
                                        <small className='pl-4'>
                                            После переноса тура в архив, он не будет отображаться на
                                            сайте
                                        </small>

                                        <CustomInput
                                            name='sales'
                                            value={formData.sales || ''}
                                            fn={e => handleInputChange('sales', e.target.value)}
                                            label='Скидка на тур | Новый тур:'
                                            white='true'
                                            error={errors.sales}
                                        />
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='cost and date' title='Цены и даты'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                                        <Tabs>
                                            <Tab
                                                className='w-full'
                                                key='Групповые цены'
                                                title='Групповые цены'
                                            >
                                                <Card>
                                                    <CardBody>
                                                        <div className='flex md:flex-row flex-col w-full gap-3'>
                                                            <RangeCalendar
                                                                value={date}
                                                                onChange={setDate}
                                                                className='w-full'
                                                            />
                                                            <div className='w-full flex flex-col gap-3'>
                                                                <CustomInput
                                                                    label='Дата с:'
                                                                    value={dateStart}
                                                                />
                                                                <CustomInput
                                                                    label=' Дата по:'
                                                                    value={dateEnd}
                                                                />
                                                                <CustomInput
                                                                    error={tourDayPriceError.double_price}
                                                                    value={tourDayPrice.double_price}
                                                                    fn={e =>
                                                                        handleDayTourPrice(
                                                                            'double_price',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    label='Цена за двухместное размещение:'
                                                                />
                                                                <CustomInput
                                                                    error={tourDayPriceError.single_price}
                                                                    value={tourDayPrice.single_price}
                                                                    fn={e =>
                                                                        handleDayTourPrice(
                                                                            'single_price',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    label='Доплата за одноместное размещение:'
                                                                />
                                                                <CustomInput
                                                                    error={tourDayPriceError.transferPrice}
                                                                    value={tourDayPrice.transferPrice}
                                                                    fn={e =>
                                                                        handleDayTourPrice(
                                                                            'transferPrice',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    label='Цена за транфер:'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className='mt-5 flex flex-col gap-3 max-h-[260px] overflow-x-auto'>
                                                            {formData.tour_day_price &&
                                                                formData.tour_day_price.map(el => (
                                                                    <div
                                                                        key={el.id}
                                                                        className='flex sm:flex-row flex-col gap-3 bg-white text-black px-3 py-2 items-center rounded-xl justify-between'
                                                                    >
                                                                        <p className='text-xl m-0'>
                                                                            {el.single_price}$
                                                                        </p>
                                                                        <div
                                                                            className={`w-5 h-5 rounded-full ${
                                                                                Date.now(el.date_start) <=
                                                                                Date.now(defaultDate.start) &&
                                                                                Date.now(el.date_end) >=
                                                                                Date.now(defaultDate.start)
                                                                                    ? 'bg-green-600'
                                                                                    : 'bg-red-600'
                                                                            }`}
                                                                        ></div>
                                                                        <p className='m-0'>
                                                                            {formatDateRange(
                                                                                el.date_start,
                                                                                el.date_end
                                                                            )}
                                                                        </p>
                                                                        <CustomButton
                                                                            fn={() => deleteTourPrice(el.id)}
                                                                            type='button'
                                                                        >
                                                                            Delete
                                                                        </CustomButton>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                            <Tab
                                                className='w-full'
                                                key='Индивидуальные цены'
                                                title='Индивидуальные цены'
                                            >
                                                <Card>
                                                    <CardBody>
                                                        <CustomInput
                                                            name='oldprice'
                                                            value={formData.oldprice || ''}
                                                            fn={e =>
                                                                handleInputChange('oldprice', e.target.value)
                                                            }
                                                            label='Цена (Старая):'
                                                            white='true'
                                                            error={errors.oldprice}
                                                            description='Цена, которая показывается на всем сайте. Указывайте цену за 1 человека в двухмесном номере. Не участвует в подсчесте тура на странице бронирования. '
                                                        />
                                                        <CustomInput
                                                            name='price'
                                                            value={formData.price || ''}
                                                            fn={e =>
                                                                handleInputChange('price', e.target.value)
                                                            }
                                                            label='Цена (Новая):'
                                                            white='true'
                                                            error={errors.price}
                                                            description='Основная цена, которая показывается на всем сайте. Указывайте цену за 1 человека в двухмесном номере. Участвует в подсчесте тура на странице бронирования. '
                                                        />
                                                        <CustomInput
                                                            name='single_price'
                                                            value={formData.single_price || ''}
                                                            fn={e =>
                                                                handleInputChange(
                                                                    'single_price',
                                                                    e.target.value
                                                                )
                                                            }
                                                            label='Доплата за одноместное размещение:'
                                                            white='true'
                                                            error={errors.single_price}
                                                            description='Цена тура для индивидуального путешественника. Для правильного подсчета указывайте полную стоимость тура. Участвует в подсчесте тура на странице бронирования. '
                                                        />
                                                        <CustomInput
                                                            name='single_room_price'
                                                            value={formData.transfer_price || ''}
                                                            fn={e =>
                                                                handleInputChange(
                                                                    'transfer_price',
                                                                    e.target.value
                                                                )
                                                            }
                                                            label='Доплата за трансфер:'
                                                            white='true'
                                                            error={errors.transfer_price}
                                                            description='Цена для рассчета тура по индивидуальной дате. Умножается на количество ночей. Участвует в подсчесте тура на странице бронирования. '
                                                        />
                                                        <CustomInput
                                                            name='solo_price'
                                                            value={formData.solo_price || ''}
                                                            fn={e =>
                                                                handleInputChange('solo_price', e.target.value)
                                                            }
                                                            label='Цена тура(Solo traveller):'
                                                            white='true'
                                                            error={errors.solo_price}
                                                            description='Цена для путешественника который едит один. '
                                                        />
                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                        </Tabs>
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='description' title='Описание тура'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <label className='w-full text-white'>
                                            Описание тура :
                                            <CustomEditor
                                                value={formData.body}
                                                fn={handleInputChange}
                                                name={'body'}
                                                id={'body'}
                                            />
                                            {errors.body && <div>{errors.body}</div>}
                                        </label>
                                        <CheckboxGroup
                                            label='Тип транспорта:'
                                            value={formData.transport}
                                            onChange={value => handleInputChange('transport', value)}
                                        >
                                            <Checkbox value='Самолет '>Самолет</Checkbox>
                                            <Checkbox value='Поезд '>Поезд</Checkbox>
                                            <Checkbox value='Легковое авто '>Легковое авто</Checkbox>
                                            <Checkbox value='Минивен '>Минивен</Checkbox>
                                            <Checkbox value='Минибас '>Минибас</Checkbox>
                                            <Checkbox value='Автобус '>Автобус</Checkbox>
                                        </CheckboxGroup>
                                        <CustomInput
                                            name='travellers'
                                            value={formData.travellers || ''}
                                            fn={e => handleInputChange('travellers', e.target.value)}
                                            label='Количество путешественников:'
                                            white='true'
                                        />
                                        <small>
                                            Укажите минимальное и максимальное количество
                                            путешественников.{' '}
                                        </small>
                                        <Select
                                            label='Команда:'
                                            className='max-w-xs'
                                            isInvalid={errors.team_id}
                                            errorMessage={errors.team_id}
                                            selectedKeys={new Set([formData.team_id])}
                                            onSelectionChange={keys =>
                                                handleInputChange('team_id', keys.values().next().value)
                                            }
                                        >
                                            {team.map(el => (
                                                <SelectItem key={el.id} value={el.id}>
                                                    {el.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='photo' title='Изображение'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <label className='text-white flex flex-col gap-3 w-full'>
                                            Основное фото
                                            {formData.photo ? (
                                                <Image
                                                    width={'500'}
                                                    height={'500'}
                                                    alt={formData.photo}
                                                    src={`https://api.turi-uzbekistana.ru/uploads/${formData.photo}`}
                                                />
                                            ) : (
                                                ''
                                            )}
                                            <input
                                                className='bg-white w-full py-3	px-2 rounded-xl cursor-pointer'
                                                name='photo'
                                                type='file'
                                                onChange={e => handleImageChange(e.target.files[0])}
                                            />
                                        </label>
                                        <label className='text-white flex flex-col gap-3 w-full'>
                                            Галерея
                                            <input
                                                className='bg-white w-full py-3	px-2 rounded-xl cursor-pointer'
                                                name='foto'
                                                type='file'
                                                multiple
                                                onChange={e => handleUploadImage(e.target.files)}
                                            />
                                            Файл изображения должен быть в формате JPG или PNG
                                            <div className='flex flex-wrap gap-3'>
                                                {formData.tourphoto.map(el => (
                                                    <div className='relative'>
                                                        <Image
                                                            width={'300'}
                                                            height={'300'}
                                                            alt={el.photo}
                                                            src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
                                                        />
                                                        <i
                                                            className='fa-solid fa-circle-xmark absolute top-0 left-0 cursor-pointer'
                                                            style={{color: '#c01c28'}}
                                                            onClick={() => handleDeleteImage(el.photo, el.id)}
                                                        ></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </label>
                                        <CustomButton>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='tour type' title='Тип тура'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <Select
                                            name='type_id'
                                            label=' Главный тип тура :'
                                            className='w-full'
                                            isInvalid={errors.type_id}
                                            errorMessage={errors.type_id}
                                            selectedKeys={new Set([formData.type_id])}
                                            onSelectionChange={keys =>
                                                handleInputChange('type_id', keys.values().next().value)
                                            }
                                        >
                                            {TourTypeBase.map(el => (
                                                <SelectItem key={el.id} value={el.id}>
                                                    {el.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                                            <CheckboxGroup
                                                label='Базовые категории:'
                                                value={formData.types}
                                                onChange={value => handleInputChange('types', value)}
                                            >
                                                {TourTypeBase.map(el => (
                                                    <Checkbox key={el.id} value={el.id}>
                                                        {el.name}
                                                    </Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                            <CheckboxGroup
                                                label='Сезоны:'
                                                value={formData.types}
                                                onChange={value => handleInputChange('types', value)}
                                            >
                                                {filteredTourTypesSeason?.map(el => (
                                                    <Checkbox value={el.id}>{el.name}</Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                            <CheckboxGroup
                                                label='Страны:'
                                                value={formData.types}
                                                onChange={value => handleInputChange('types', value)}
                                            >
                                                {filteredTourTypesCountry.map(el => (
                                                    <Checkbox key={el.id} value={el.id}>
                                                        {el.name}
                                                    </Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                        </div>
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='services' title='Услуги'>
                            <Card>
                                <CardBody>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='grid md:grid-cols-2 md:gap-3 gap-10'
                                    >
                                        <div className='flex flex-col gap-3'>
                                            <CustomInput
                                                placeholder='Искать...'
                                                value={includeFilter}
                                                fn={e => setIncludeFilter(e.target.value)}
                                            />
                                            <CheckboxGroup
                                                label='Включено:'
                                                value={formData.include}
                                                onChange={value => handleInputChange('include', value)}
                                            >
                                                <div
                                                    className='max-h-[300px] overflow-y-auto flex flex-col gap-3 overflow-x-hidden'>
                                                    {filteredIncludeServices.length > 0 ? (
                                                        filteredIncludeServices.map(el => (
                                                            <Checkbox key={el.id} value={el.id}>
                                                                <i className={el.icon}/> {el.title}
                                                            </Checkbox>
                                                        ))
                                                    ) : (
                                                        <div className='flex justify-center items-center'>
                                                            Ничего не найдено
                                                        </div>
                                                    )}
                                                </div>
                                            </CheckboxGroup>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <CustomInput
                                                placeholder='Искать...'
                                                value={excludeFilter}
                                                fn={e => setExcludeFilter(e.target.value)}
                                            />
                                            <CheckboxGroup
                                                label='Доп расходы:'
                                                value={formData.exclude}
                                                onChange={value => handleInputChange('exclude', value)}
                                            >
                                                <div
                                                    className='max-h-[300px] overflow-y-auto flex flex-col gap-3 overflow-x-hidden'>
                                                    {filteredExcludeServices.length > 0 ? (
                                                        filteredExcludeServices.map(el => (
                                                            <Checkbox key={el.id} value={el.id}>
                                                                <i className={el.icon}/>
                                                                {el.title}
                                                            </Checkbox>
                                                        ))
                                                    ) : (
                                                        <div className='flex justify-center items-center'>
                                                            Ничего не найдено
                                                        </div>
                                                    )}
                                                </div>
                                            </CheckboxGroup>
                                        </div>
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='route' title='Маршрут'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <Textarea
                                            label='Маршрут тура'
                                            labelPlacement='outside'
                                            placeholder='Enter your description'
                                            minRows={50}
                                            className='w-full'
                                            value={formData.map}
                                            name='map'
                                            onChange={e => handleInputChange('map', e.target.value)}
                                        />
                                        <a
                                            href='https://yandex.ru/map-constructor/'
                                            target='_blank'
                                        >
                                            Конструктор карт
                                        </a>
                                        <div className='grid md:grid-cols-2 gap-3'>
                                            <div className='flex flex-col gap-3'>
                                                <CustomInput
                                                    placeholder='Искать...'
                                                    value={countryFilter}
                                                    fn={e => setCountryFilter(e.target.value)}
                                                />
                                                <CheckboxGroup
                                                    label='Страны:'
                                                    value={formData.country}
                                                    onChange={value =>
                                                        handleInputChange('country', value)
                                                    }
                                                >
                                                    <div
                                                        className='max-h-[350px] overflow-y-auto flex flex-col gap-3 overflow-x-hidden'>
                                                        {filteredCountry?.length > 0 ? (
                                                            filteredCountry?.map(el => (
                                                                <Checkbox
                                                                    onValueChange={e =>
                                                                        removeTourCountry(e, el.tour_country, el.id)
                                                                    }
                                                                    key={el.id}
                                                                    value={el.id}
                                                                >
                                                                    {el.name}
                                                                </Checkbox>
                                                            ))
                                                        ) : (
                                                            <div className='flex justify-center items-center'>
                                                                Ничего не найдено
                                                            </div>
                                                        )}
                                                    </div>
                                                </CheckboxGroup>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <CustomInput
                                                    placeholder='Искать...'
                                                    value={cityFilter}
                                                    fn={e => setCityFilter(e.target.value)}
                                                />
                                                <CheckboxGroup
                                                    label='Города:'
                                                    value={formData.city}
                                                    onChange={value => handleInputChange('city', value)}
                                                >
                                                    <div
                                                        className='max-h-[350px] overflow-y-auto flex flex-col gap-3 overflow-x-hidden'>
                                                        {filteredCity.length > 0 ? (
                                                            filteredCity.map(el => (
                                                                <Checkbox
                                                                    onValueChange={e =>
                                                                        removeTourCity(e, el.tourcity, el.id)
                                                                    }
                                                                    key={el.id}
                                                                    value={el.id}
                                                                >
                                                                    {el.name}
                                                                </Checkbox>
                                                            ))
                                                        ) : (
                                                            <div className='flex justify-center items-center'>
                                                                Ничего не найдено
                                                            </div>
                                                        )}
                                                    </div>
                                                </CheckboxGroup>
                                            </div>
                                        </div>
                                        <div>
                                            <Accordion variant='splitted'>
                                                {formData.tourtoday.map((el, i) => (
                                                    <AccordionItem
                                                        key={el.id}
                                                        title={`День: ${i + 1} ${el.name}`}
                                                    >
                                                        <CustomInput
                                                            label='Name'
                                                            value={el.name}
                                                            fn={e =>
                                                                handleInputChangeForRoutes(
                                                                    String(i),
                                                                    'name',
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <br/>
                                                        <CustomEditor
                                                            value={el.body}
                                                            name='body'
                                                            id={`editor-${i}`}
                                                            index={i}
                                                            fn1={handleInputChangeForRoutes}
                                                        />
                                                        <br/>
                                                        <div className='flex gap-3'>
                                                            <Checkbox
                                                                name='breakfast'
                                                                isSelected={el.breakfast}
                                                                onValueChange={e =>
                                                                    handleInputChangeForRoutes(i, 'breakfast', e)
                                                                }
                                                            >
                                                                Завтрак
                                                            </Checkbox>
                                                            <Checkbox
                                                                name='lunch'
                                                                isSelected={el.lunch}
                                                                onValueChange={e =>
                                                                    handleInputChangeForRoutes(i, 'lunch', e)
                                                                }
                                                            >
                                                                Обед
                                                            </Checkbox>
                                                            <Checkbox
                                                                name='dinner'
                                                                isSelected={el.dinner}
                                                                onValueChange={e =>
                                                                    handleInputChangeForRoutes(i, 'dinner', e)
                                                                }
                                                            >
                                                                Ужин
                                                            </Checkbox>
                                                        </div>
                                                        <br/>
                                                        <div className='flex flex-col gap-3'>
                                                            <CustomInput
                                                                placeholder='Искать...'
                                                                value={hotelFilter}
                                                                fn={e => setHotelFilter(e.target.value)}
                                                            />
                                                            <CheckboxGroup
                                                                label='Добавить гостиницу'
                                                                value={el.hotels ?? []}
                                                                name='hotels'
                                                                onValueChange={value =>
                                                                    handleInputChangeForRoutes(i, 'hotels', value)
                                                                }
                                                            >
                                                                <div
                                                                    className='min-h-[150px] overflow-y-auto flex flex-col gap-3 overflow-x-hidden'>
                                                                    {filteredHotels.length > 0 ? (
                                                                        filteredHotels.map(el => (
                                                                            <Checkbox key={el.id} value={el.id}>
                                                                                {el.name}
                                                                            </Checkbox>
                                                                        ))
                                                                    ) : (
                                                                        <div
                                                                            className='flex justify-center items-center'>
                                                                            Ничего не найдено
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </CheckboxGroup>
                                                        </div>
                                                        <CustomButton
                                                            fn={() => removeItem(el.id)}
                                                            color='secondary'
                                                            type='button'
                                                        >
                                                            Удалить
                                                        </CustomButton>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                            <CustomButton className='my-3' fn={addItem} type='button'>
                                                Добавить день
                                            </CustomButton>
                                        </div>
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='faq' title='Вопросы'>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <CheckboxGroup
                                            label='Добавить вопросы:'
                                            value={formData.faqIds}
                                            onChange={value => handleInputChange('faqIds', value)}
                                        >
                                            {formData.tour_faqs.map(el => (
                                                <Checkbox
                                                    className='py-3'
                                                    key={el.id}
                                                    onValueChange={e => removeFaq(e, el.tour_faqs, el.id)}
                                                    value={el.id}
                                                >
                                                    {el.name}
                                                </Checkbox>
                                            ))}
                                        </CheckboxGroup>
                                        <CustomButton type='submit'>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            )}
        </>
    )
}

export default AdminMainTour
