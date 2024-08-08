import {api} from '@/Api/api'
import CustomButton from '@/UI/CustomButton'
import CustomInput from '@/UI/CustomInput'
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {Select, SelectItem} from "@nextui-org/react";
import CustomEditor from "@/UI/CustomEditor.jsx";
import Image from "next/image.js";
import {number, object, string} from "yup";

const AdminCity = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [country, setCountry] = useState([])
    const [formData, setFormData] = useState({
        country_id: 0,
        name: '',
        url: '',
        body: '',
        map: '',
        photo: '',
        metakeywords: '',
        metadescription: '',
        title: '',
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countryResponse = await api.get('country')
                setCountry(countryResponse.data.data)

                if (id) {
                    const {data} = await api.get(`/city/${id}`)
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
                    } = data.data
                    setFormData({
                        country_id: country_id || 0,
                        name: name || '',
                        url: url || '',
                        body: body || '',
                        map: map || '',
                        photo: photo || '',
                        metakeywords: metakeywords || '',
                        metadescription: metadescription || '',
                        title: title || '',
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [id])

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'country_id' ? Number(value) : value,
        }))
    }

    const handleSelectChange = keys => {
        setFormData(prevState => ({
            ...prevState,
            country_id:[...keys][0]
        }))
    }

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
            if (id) {
                router.push(`/admin/${slug}/edit/${id}`);
            } else {
                router.push(`/admin/${slug}/create`);
            }
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await citySchema.validate(formData, {abortEarly: false})
            if (id) {
                await api.put(`/city/${id}`, formData)
            } else {
                await api.post(`/city`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            const newErrors = {};

            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            if (error?.response?.data) {
                newErrors['url'] = error?.response?.data?.message;
                newErrors['country_id'] = error?.response?.data?.country_id;
            }
            setErrors(newErrors);
        }
    }


    const citySchema = object({
        name: string().required('Please enter name of city'),
        country_id: string().required('Please choose a country'),
        url: string().required('Please enter url of city')
    })

    return (
        <form className='grid gap-3 md:grid-cols-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3 md:col-span-2'>
                <CustomInput
                    name='name'
                    fn={handleInputChange}
                    value={formData.name}
                    label='Название города:'
                    error={errors.name}
                />
                <Select
                    label="Выберите страну"
                    placeholder="Выберите страну"
                    selectedKeys={new Set([formData.country_id.toString()])}
                    className="w-full"
                    errorMessage={errors.country_id}
                    isInvalid={errors.country_id}
                    onSelectionChange={handleSelectChange}
                >
                    {country.map(el => (
                        <SelectItem key={el.id} value={el.id.toString()}>
                            {el.name}
                        </SelectItem>
                    ))}
                </Select>
                <CustomInput
                    name='url'
                    fn={handleInputChange}
                    value={formData.url}
                    error={errors.url}
                    label='Ссылка на город:'
                />
                <label className='text-white w-full'>
                    Описание города:
                    <CustomEditor
                        id='body'
                        fn={handleEditorChange}
                        name='body'
                        value={formData.body}
                    />
                </label>
                <CustomInput
                    name='title'
                    fn={handleInputChange}
                    value={formData.title}
                    label='Title:'
                />
                <CustomInput
                    name='metakeywords'
                    fn={handleInputChange}
                    value={formData.metakeywords}
                    label='Metakeywords:'
                />
                <CustomInput
                    name='metadescription'
                    fn={handleInputChange}
                    value={formData.metadescription}
                    label='Metadescription:'
                />
            </div>
            <div>
                <CustomInput
                    name='map'
                    fn={handleInputChange}
                    value={formData.map}
                    label='Карта:'
                />
                <label className='text-white flex flex-col gap-3 w-full'>
                    Фото города
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
            </div>
            <CustomButton type='submit'>Save</CustomButton>
        </form>
    )
}

export default AdminCity
