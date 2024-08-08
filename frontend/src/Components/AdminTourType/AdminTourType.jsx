import React, {useEffect, useState} from 'react'
import {useParams, useRouter} from "next/navigation.js";
import {api} from "@/Api/api.js";
import CustomInput from "@/UI/CustomInput.jsx";
import CustomButton from "@/UI/CustomButton.jsx";
import CustomEditor from "@/UI/CustomEditor.jsx";
import {object, string} from "yup";
import Image from "next/image.js";

export default function AdminTourType() {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        parent: 0,
        name: '',
        type: '',
        url: '',
        photo: '',
        description: '',
        title: '',
        metakeywords: '',
        metadescription: '',
        sorting: 0,
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/tour_type/${id}`)
                const {
                    parent,
                    name,
                    type,
                    url,
                    photo,
                    description,
                    title,
                    metakeywords,
                    metadescription,
                    sorting,
                } = data.data
                setFormData({
                    parent: parent || 0,
                    name: name || '',
                    type: type || '',
                    url: url || '',
                    photo: photo || '',
                    description: description || '',
                    title: title || '',
                    metakeywords: metakeywords || '',
                    metadescription: metadescription || '',
                    sorting: sorting || 0,
                })
            } catch (error) {
                setError(error.message)
            }
        }

        fetchData()
    }, [id])

    const handleInputChange = e => {
        const {name, value, type, checked} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await tourTypeSchema.validate(formData,{abortEarly:false})
            if (id) {
                await api.put(`/tour_type/${id}`, formData)
            } else {
                await api.post(`/tour_type`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            const newErrors = {};
            console.error(error.message)
            error.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            if (error?.response?.data?.message) {
                newErrors['url'] = error?.response?.data?.message;
            }
            console.error(newErrors);
        }
    }

    const handleEditorChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const tourTypeSchema = object({
        name:string().typeError('Please enter letters not numbers').required('Please enter name of tour'),
        url:string().required('Please enter url'),
    })

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

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <CustomInput error={errors.name} name='name' label='Заголовок' value={formData.name}
                         fn={handleInputChange}/>
            <CustomInput name='parent' label='Родительская категория' value={formData.parent} fn={handleInputChange}/>
            <label className="text-white">
                Описание
                <CustomEditor id={'description'}
                              fn={handleEditorChange}
                              name={'description'}
                              value={formData.description}
                />
            </label>
            <CustomInput error={errors.url} name='url' label='Ссылка на тип' value={formData.url}
                         fn={handleInputChange}/>
            <CustomInput name='title' label='Title' value={formData.title} fn={handleInputChange}/>
            <CustomInput name='metakeywords' label='Metakeywords' value={formData.metakeywords} fn={handleInputChange}/>
            <CustomInput name='metadescription' label='Metadescription' value={formData.metadescription}
                         fn={handleInputChange}/>
            <label className='text-white flex flex-col gap-3 w-full'>
                Основное фото
                <input
                    className='bg-white w-full py-3	px-2 rounded-xl cursor-pointer'
                    name='photo'
                    type='file'
                    onChange={(e) => handleImageChange(e.target.files[0])}
                />
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
