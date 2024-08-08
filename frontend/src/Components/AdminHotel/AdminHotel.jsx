import React, {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import {api} from "@/Api/api.js";
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Checkbox,
    CheckboxGroup,
    Select,
    SelectItem,
    Tab,
    Tabs
} from "@nextui-org/react";
import CustomInput from "@/UI/CustomInput.jsx";
import CustomButton from "@/UI/CustomButton.jsx";
import CustomEditor from "@/UI/CustomEditor.jsx";
import Image from "next/image.js";
import {boolean, number, object, string} from "yup";

export default function AdminHotel() {
    const router = useRouter();
    const pathName = usePathname()
    const {id, slug} = useParams();
    const [formData, setFormData] = useState({
        country_id: 0,
        cityid: 0,
        name: "",
        url: "",
        title: "",
        metakeywords: "",
        metadescription: "",
        rating: 0,
        address: "",
        photo: "",
        body: "",
        map: "",
        services: "",
        service_text: "",
        conditions: "",
        publics: 0,
        booking_rating: 0,
        hotel_rooms: [],
        hotel_photo: []
    });
    const [errors, setErrors] = useState({});
    const [city, setCity] = useState([]);
    const [country, setCountry] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const countryResponse = await api.get('/country');
            const cityResponse = await api.get('/city');
            setCountry(countryResponse.data.data);
            setCity(cityResponse.data.data);

            if (!id) return;

            try {
                const {data} = await api.get(`/hotel/${id}`);
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
                } = data.data;
                setFormData({
                    country_id: country_id || 0,
                    cityid: cityid || 0,
                    name: name || '',
                    url: url || '',
                    title: title || '',
                    metakeywords: metakeywords || '',
                    metadescription: metadescription || '',
                    rating: rating || 0,
                    address: address || '',
                    photo: photo || '',
                    body: body || '',
                    map: map || '',
                    services: services || '',
                    service_text: service_text || '',
                    conditions: conditions || '',
                    publics: publics || 0,
                    booking_rating: booking_rating || 0,
                    hotel_rooms: hotel_rooms || [],
                    hotel_photo: hotel_photo || []
                });
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = e => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : name === 'rating' || name === 'booking_rating' ? Number(value) : value,
        }));
    };

    const handleCheckboxChange = (value) => {
        setFormData(prevState => ({
            ...prevState,
            services: value,
        }));
    };

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


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await hotelSchema.validate(formData, {abortEarly: false})
            if (id) {
                await api.put(`/hotel/${id}`, formData);
                router.push(`/admin/${slug}`);
            } else {
                const res = await api.post(`/hotel`, formData);
                const id = await res.data.id;
                router.push(`/admin/${slug}/edit/${id}`);
            }

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
    };

    const addItem = () => {
        setFormData((prevState) => ({
            ...prevState,
            hotel_rooms: [
                ...prevState.hotel_rooms,
                {
                    id: formData.hotel_rooms.length + 1,
                    hotelid: Number(id),
                    name: '',
                    price: 0,
                    sizem: 0,
                    body: '',
                    breakfast: 0,
                    lunch: 0,
                    dinner: 0,
                    p_person: 0
                }
            ]
        }));
    };

    const removeItem = async (id) => {
        try {
            await api.delete(`/hotel/${id}/rooms`); // Удаление элемента на сервере
            setFormData((prevState) => ({
                ...prevState,
                hotel_rooms: prevState.hotel_rooms.filter(item => item.id !== id)
            }));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleInputChangeForRooms = async (index, field, value) => {
        setFormData((prevState) => {
            const newHotelRooms = [...prevState.hotel_rooms];
            newHotelRooms[index] = {
                ...newHotelRooms[index],
                [field]: field === 'body' || field === 'name' || field === 'breakfast' || field === 'lunch' || field === 'dinner' ? value : Number(value)
            };
            return {...prevState, hotel_rooms: newHotelRooms};
        });
    };

    const hotelSchema = object({
        name: string().min(1).required('Please enter a name'),
        country_id: string().min(1, 'Please choose a country'),
        cityid: string().min(1, 'Please choose a city'),
        url: string().required('Please enter url'),
        rating: number().min(0).typeError('Please enter numbers').max(5, 'Choose number from 1 to 5'),
        booking_rating: number().min(0).typeError('Please enter numbers').max(10, 'Choose number from 1 to 10'),
    })

    const handleUploadImage = async (e) => {
        const formDataUpload = new FormData();
        for (let i = 0; i < e.length; i++) {
            formDataUpload.append('files', e[i]);
        }

        try {
            const response = await api.post('/uploadmany', formDataUpload);
            const uploadedPhotos = response.data.locations; // Получаем массив URL загруженных файлов

            const newPhotos = uploadedPhotos.map((location, i) => ({
                id: i,
                hotelid: Number(id), // Убедитесь, что id существует и это число
                alt: location,
                photo: location
            }));

            setFormData(prevState => ({
                ...prevState,
                hotel_photo: [...prevState.hotel_photo, ...newPhotos]
            }));

            if (id) {
                router.push(`/admin/${slug}/edit/${id}`);
            } else {
                router.push(`/admin/${slug}`);
            }

        } catch (error) {
            console.error('Ошибка загрузки файлов:', error);
        }
    };
    const handleDeleteImage = async (file, id) => {
        await api.delete(`/uploads/${file}`);
        await api.delete(`hotel/${id}/photo`);
        setFormData((prevState) => ({
            ...prevState,
            hotel_photo: prevState.hotel_photo.filter(item => item.id !== id)
        }));
    }
    return (
        <div className={`${pathName.startsWith('/admin/hotel/create') ? '' : 'dark'}`}>
            {
                pathName.startsWith('/admin/hotel/create') ? (
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <CustomInput
                            description='Будет показываться на всем сайте'
                            label='Название' name='name'
                            value={formData.name}
                            fn={handleInputChange}
                            error={errors.name}
                        />
                        <CustomInput label='Сслыка на гостницу'
                                     name='url'
                                     value={formData.url}
                                     error={errors.url}
                                     fn={handleInputChange}/>
                        <Select
                            label="Страна гостницы"
                            placeholder="Страна гостницы"
                            selectedKeys={new Set([formData.country_id])}
                            className="w-full"
                            errorMessage={errors.country_id}
                            isInvalid={errors.country_id}
                                onSelectionChange={(keys) => handleSelectChange(keys, 'country_id')}
                        >
                            {country.map(el => (
                                <SelectItem key={el.id} value={el.id}>
                                    {el.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Город гостницы"
                            placeholder="Город гостницы"
                            selectedKeys={new Set([formData.cityid])}
                            className="w-full"
                            errorMessage={errors.cityid}
                            isInvalid={errors.cityid}
                            onSelectionChange={(keys) => handleSelectChange(keys, 'cityid')}
                        >
                            {city.map(el => (
                                <SelectItem key={el.id} value={el.id.toString()}>
                                    {el.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <CustomButton>Save</CustomButton>
                    </form>
                ) : (
                    <Tabs>
                        <Tab key='Общие настройки' title='Общие настройки'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <CustomInput
                                            description='Будет показываться на всем сайте'
                                            label='Название' name='name'
                                            value={formData.name}
                                            fn={handleInputChange}
                                            error={errors.name}
                                        />
                                        <CustomInput description='Используется для SEO' label='Заголовок' name='title'
                                                     value={formData.title} fn={handleInputChange}/>
                                        <CustomInput label='Metakeywords' name='metakeywords'
                                                     value={formData.metakeywords}
                                                     fn={handleInputChange}/>
                                        <CustomInput label='Metadescription' name='metadescription'
                                                     value={formData.metadescription} fn={handleInputChange}/>
                                        <CustomInput label='Сслыка на гостницу'
                                                     name='url'
                                                     value={formData.url}
                                                     error={errors.url}
                                                     fn={handleInputChange}/>
                                        <CustomInput
                                            description='Для правильного отображения, указывайте цифры от 1 до 5 '
                                            label='Рейтинг гостницы'
                                            name='rating'
                                            value={formData.rating}
                                            error={errors.rating}
                                            fn={handleInputChange}/>
                                        <CustomInput
                                            description='Для правильного отображения, можете указать дробные числа. Пример "9.3" '
                                            label='Рейтинг гостницы на Booking.com'
                                            name='booking_rating'
                                            value={formData.booking_rating}
                                            error={errors.booking_rating}
                                            fn={handleInputChange}/>
                                        <Select
                                            label="Страна гостницы"
                                            placeholder="Страна гостницы"
                                            selectedKeys={new Set([formData.country_id.toString()])}
                                            className="w-full"
                                            errorMessage={errors.country_id}
                                            isInvalid={errors.country_id}
                                            onSelectionChange={(keys) => handleSelectChange(keys, 'country_id')}
                                        >
                                            {country.map(el => (
                                                <SelectItem key={el.id} value={el.id.toString()}>
                                                    {el.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Select
                                            label="Город гостницы"
                                            placeholder="Город гостницы"
                                            selectedKeys={new Set([formData.cityid.toString()])}
                                            className="w-full"
                                            errorMessage={errors.cityid}
                                            isInvalid={errors.cityid}
                                            onSelectionChange={(keys) => handleSelectChange(keys, 'cityid')}
                                        >
                                            {city.map(el => (
                                                <SelectItem key={el.id} value={el.id.toString()}>
                                                    {el.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <label className='w-full text-white'>
                                            Расположение гостницы
                                            <CustomEditor
                                                id='map'
                                                fn={handleEditorChange}
                                                name='map'
                                                value={formData.map}
                                            />
                                        </label>
                                        <CustomButton>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='Номера' title='Номера'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <Accordion variant="splitted">
                                            {formData.hotel_rooms.map((el, i) => (
                                                <AccordionItem key={el.id}
                                                               title={`Название номера: ${i + 1} ${el.name}`}>
                                                    <div className='flex flex-col gap-3'>
                                                        <CustomInput
                                                            label='Название номера'
                                                            value={el.name}
                                                            name="name"
                                                            index={i}
                                                            fn={(e) => handleInputChangeForRooms(i, 'name', e.target.value)}
                                                        />
                                                        <CustomInput
                                                            label='Размер Номера'
                                                            value={el.sizem}
                                                            name="sizem"
                                                            index={i}
                                                            fn={(e) => handleInputChangeForRooms(i, 'sizem', e.target.value)}
                                                        />
                                                        <CustomInput
                                                            label='Цена за номер'
                                                            value={el.price}
                                                            name="price"
                                                            index={i}
                                                            fn={(e) => handleInputChangeForRooms(i, 'price', e.target.value)}
                                                        />
                                                        <div className='flex gap-3'>
                                                            <Checkbox name='breakfast'
                                                                      isSelected={el.breakfast}
                                                                      onValueChange={(e) => handleInputChangeForRooms(i, 'breakfast', e)}>
                                                                Завтрак
                                                            </Checkbox>
                                                            <Checkbox
                                                                name='lunch'
                                                                isSelected={el.lunch}
                                                                onValueChange={(e) => handleInputChangeForRooms(i, 'lunch', e)}>
                                                                Обед</Checkbox>
                                                            <Checkbox
                                                                name='dinner'
                                                                isSelected={el.dinner}
                                                                onValueChange={(e) => handleInputChangeForRooms(i, 'dinner', e)}>
                                                                Ужин</Checkbox>
                                                        </div>
                                                        <CustomInput
                                                            label='Вместимость номера'
                                                            value={el.p_person}
                                                            name="p_person"
                                                            index={i}
                                                            fn={(e) => handleInputChangeForRooms(i, 'p_person', e.target.value)}
                                                        />

                                                        <CustomButton
                                                            fn={() => removeItem(el.id)}
                                                            color="secondary"
                                                            type='button'
                                                        >
                                                            Удалить
                                                        </CustomButton>
                                                    </div>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                        <CustomButton
                                            className='my-3'
                                            fn={addItem}
                                            type='button'>
                                            Добавить номер
                                        </CustomButton>
                                        <CustomButton>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='Описание гостиницы' title='Описание гостиницы'>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <label className='w-full text-white'>
                                            Описание гостиницы
                                            <CustomEditor
                                                id='body'
                                                fn={handleEditorChange}
                                                name='body'
                                                value={formData.body}
                                            />
                                        </label>
                                        <CustomButton>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key='Изображение' title='Изображение'>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <label className='text-white flex flex-col gap-3 w-full'>
                                            Основное фото
                                            <input
                                                className='bg-white w-full py-3	px-2 rounded-xl cursor-pointer'
                                                name='foto'
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
                                        <label className='text-white flex flex-col gap-3 w-full'>
                                            Галерея
                                            <input
                                                className='bg-white w-full py-3	px-2 rounded-xl cursor-pointer'
                                                name='foto'
                                                type='file'
                                                multiple
                                                onChange={(e) => handleUploadImage(e.target.files)}
                                            />
                                            Файл изображения должен быть в формате JPG или PNG
                                            <div className='flex flex-wrap gap-3'>
                                                {formData.hotel_photo.map(el => (
                                                    <div className='relative'>
                                                        <Image
                                                            width={'300'}
                                                            height={'300'}
                                                            alt={el.alt}
                                                            src={`http://localhost:4000/uploads/${el.photo}`
                                                            }
                                                        />
                                                        <i className="fa-solid fa-circle-xmark absolute top-0 left-0 cursor-pointer"
                                                           style={{color: "#c01c28"}}
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
                        <Tab key='Услуги' title='Услуги'>
                            <Card>
                                <CardBody>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        <CheckboxGroup
                                            value={formData.services}
                                            onChange={handleCheckboxChange}
                                            // type='none'
                                            label='Услуги:'
                                        >
                                            <Checkbox value={1}>Wifi</Checkbox>
                                            <Checkbox value={2}>Бар</Checkbox>
                                            <Checkbox value={3}>Бассейн</Checkbox>
                                            <Checkbox value={4}>Ресторан</Checkbox>
                                            <Checkbox value={5}>Пункт обмена</Checkbox>
                                            <Checkbox value={6}>Салон красоты</Checkbox>
                                            <Checkbox value={7}>Сувенирная лавка</Checkbox>
                                            <Checkbox value={8}>Не курить</Checkbox>
                                            <Checkbox value={9}>Конференц зал</Checkbox>
                                            <Checkbox value={10}>Фитнес клуб</Checkbox>
                                            <Checkbox value={11}>Сауна</Checkbox>
                                        </CheckboxGroup>
                                        <CustomButton>Save</CustomButton>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                )
            }
        </div>
    );
}
