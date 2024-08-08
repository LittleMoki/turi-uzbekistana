'use client'
import {api} from '@/Api/api'
import CustomInput from '@/UI/CustomInput'
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {Select, SelectItem} from "@nextui-org/react";
import CustomEditor from "@/UI/CustomEditor.jsx";
import Image from "next/image";
import CustomButton from "@/UI/CustomButton.jsx";
import {number, object, string} from "yup";

const AdminPlace = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [city, setCity] = useState([])
    const [country, setCountry] = useState([])
    const [formData, setFormData] = useState({
        country_id: 0,
        cityid: 0,
        url: '',
        name: '',
        body: '',
        photo: '',
        foto: '',
        fotoext: '',
        metakeywords: '',
        metadescription: '',
        publics: 0,
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityResponse = await api.get('city')
                const countryResponse = await api.get('country')
                setCity(cityResponse.data.data)
                setCountry(countryResponse.data.data)

                if (id) {
                    const {data} = await api.get(`/places/${id}`)
                    const {
                        country_id,
                        cityid,
                        url,
                        name,
                        body,
                        photo,
                        foto,
                        fotoext,
                        metakeywords,
                        metadescription,
                        publics,
                    } = data.data
                    setFormData({
                        country_id: country_id || 0,
                        cityid: cityid || 0,
                        url: url || '',
                        name: name || '',
                        body: body || '',
                        photo: photo || '',
                        foto: foto || '',
                        fotoext: fotoext || '',
                        metakeywords: metakeywords || '',
                        metadescription: metadescription || '',
                        publics: publics || 0,
                    })
                }
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

    const handleSelectChange = (keys,name) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: [...keys][0],
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
            await placeSchema.validate(formData,{abortEarly:false})
            if (id) {
                await api.put(`/places/${id}`, formData)
            } else {
                await api.post(`/places`, formData)
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

    const placeSchema = object({
        name:string().required('Please enter name of places'),
        cityid:string().min(1,'Please choose a city'),
        country_id:string().min(1,'Please choose a country'),
        url:string().required('Please enter url of places')
    })
    return (
        <form className='grid md:grid-cols-3 gap-3'  onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3 col-span-2'>
                <CustomInput
                    name='name'
                    fn={handleInputChange}
                    value={formData.name}
                    error={errors.name}
                    label='Название достопримечательности:'
                />
                <Select
                    label="Выберите страну"
                    placeholder="Выберите страну"
                    isInvalid={errors.country_id}
                    errorMessage={errors.country_id}
                    selectedKeys={new Set([formData.country_id])}
                    className="w-full"
                    // name='country_id'
                    onSelectionChange={(e)=>handleSelectChange(e, 'country_id')}
                >
                    {country.map(el => (
                        <SelectItem key={el.id} value={el.id}>
                            {el.name}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Выберите город"
                    placeholder="Выберите город"
                    isInvalid={errors.cityid}
                    errorMessage={errors.cityid}
                    selectedKeys={new Set([formData.cityid])}
                    className="w-full"
                    onSelectionChange={(e)=>handleSelectChange(e, 'cityid')}

                >
                    {city.map(el => (
                        <SelectItem key={el.id} value={el.id}>
                            {el.name}
                        </SelectItem>
                    ))}
                </Select>
                <CustomInput
                    name='url'
                    fn={handleInputChange}
                    value={formData.url}
                    error={errors.url}
                    label='Ссылка на достопримечательность:'
                />

                <label className='w-full text-white'>
                    Описание :
                    <CustomEditor
                        id='body'
                        fn={handleEditorChange}
                        name='body'
                        value={formData.body}
                    />
                </label>
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
                Фото достопримечательности
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
            <CustomButton
                className='bg-black py-2 px-5 rounded-md'
                type='submit'
            >Save</CustomButton>
        </form>
    )
}

export default AdminPlace
