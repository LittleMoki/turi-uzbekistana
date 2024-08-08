'use client'
import {api} from '@/Api/api'
import CustomInput from '@/UI/CustomInput'
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import CustomButton from '../../UI/CustomButton'
import CustomEditor from '@/UI/CustomEditor'
import Image from "next/image";
import {Label} from "@mui/icons-material";
import {object, string} from "yup";

const AdminCountry = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        language_id: 0,
        name: '',
        url: '',
        description: '',
        title: '',
        metadescription: '',
        metakeywords: '',
        photo: '',
    })
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/country/${id}`)
                const {
                    language_id,
                    name,
                    url,
                    description,
                    title,
                    metadescription,
                    metakeywords,
                    photo,
                } = data.data
                setFormData({
                    language_id: language_id || 0,
                    name: name || '',
                    url: url || '',
                    description: description || '',
                    title: title || '',
                    metadescription: metadescription || '',
                    metakeywords: metakeywords || '',
                    photo: photo || '',
                })
            } catch (error) {
                setError(error.message)
            }
        }

        fetchData()
    }, [id])

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
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

            if(id){
                router.push(`/admin/${slug}/edit/${id}`);
            }else {
                router.push(`/admin/${slug}/create`);
            }
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await pageSchema.validate(formData, {abortEarly: false})
            if (id) {
                await api.put(`/country/${id}`, formData)
            } else {
                await api.post(`/country`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            console.error(error?.response?.data?.message)
            const newErrors = {};
            console.error(error.message)
            error.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            if (error?.response?.data?.message) {
                newErrors['url'] = error?.response?.data?.message;
            }

            setErrors(newErrors);
        }
    }

    const pageSchema = object({
        name: string().required('Please enter a name'),
        url: string().required('Please enter a url'),
    })

    return (
        <form className='grid md:grid-cols-3 gap-3 items-start' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3 md:col-span-2'>
                <CustomInput
                    name='name'
                    fn={handleInputChange}
                    value={formData.name}
                    label='Название страны:'
                    error={errors.name}
                />
                <CustomInput
                    name='url'
                    fn={handleInputChange}
                    value={formData.url}
                    label='Ссылка на страну:'
                    error={errors.url}
                />
                <label className='w-full text-white'>
                    Описание страны:
                    <CustomEditor
                        id='description'
                        fn={handleEditorChange}
                        name='description'
                        value={formData.description}
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
            <label className='text-white flex flex-col gap-3 w-full'>
                Фото страны
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
    )
}

export default AdminCountry
