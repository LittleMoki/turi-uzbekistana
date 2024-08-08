'use client'
import {api} from '@/Api/api'
import CustomInput from '@/UI/CustomInput'
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import CustomButton from '@/UI/CustomButton'
import CustomEditor from "@/UI/CustomEditor.jsx";
import Image from "next/image.js";
import {object, string} from "yup";

const AdminNewsType = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        photo: '',
        url: '',
        title: '',
        metakeywords: '',
        metadescription: '',
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/news_type/${id}`)
                const {
                    name,
                    description,
                    photo,
                    url,
                    title,
                    metakeywords,
                    metadescription,
                } = data.data
                setFormData({
                    name: name || '',
                    description: description || '',
                    photo: photo || '',
                    url: url || '',
                    title: title || '',
                    metakeywords: metakeywords || '',
                    metadescription: metadescription || '',
                })
            } catch (error) {
                console.error(error.message)
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

            router.push(`/admin/${slug}/edit/${id}`);
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
        }
    };


    const handleSubmit = async e => {
        if (e !== undefined) e.preventDefault()
        try {
            await newsTypeSchema.validate(formData,{abortEarly:false})
            if (id) {
                await api.put(`/news_type/${id}`, formData)
            } else {
                await api.post(`/news_type`, formData)
            }
            router.push(`/admin/${slug}`)
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

    const newsTypeSchema = object({
        name:string().required('Please enter name of news type'),
        url:string().required('Please enter url of news type'),
    })

    return (
        <form className='flex flex-col gap-3 items-start' onSubmit={handleSubmit}>
            <CustomInput
                name='name'
                fn={handleInputChange}
                value={formData.name}
                label='Название'
                error={errors.name}
            />
            <CustomInput
                name='url'
                fn={handleInputChange}
                value={formData.url}
                error={errors.url}
                label='Ссылка на тип'
            />
            <label className='w-full text-white'>
                Описание
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
                label='Title'
            />
            <CustomInput
                name='metakeywords'
                fn={handleInputChange}
                value={formData.metakeywords}
                label='Metakeywords'
            />
            <CustomInput
                name='metadescription'
                fn={handleInputChange}
                value={formData.metadescription}
                label='Metadescription'
            />


            <label className='text-white flex flex-col gap-3 w-full'>
                Фото типа
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

export default AdminNewsType
