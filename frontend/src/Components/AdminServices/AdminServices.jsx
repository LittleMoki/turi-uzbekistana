'use client'
import {api} from '@/Api/api'
import CustomInput from '@/UI/CustomInput'
import CustomSelect from '@/UI/CustomSelect'
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import CustomButton from '../../UI/CustomButton'
import {object, string} from "yup";
import {Select, SelectItem} from "@nextui-org/react";

const AdminServices = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        type_id: 1,
        title: '',
        icon: '',
        price: 0,
        archive: 0,
    })

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/services/${id}`)
                const {type_id, title, icon, price, archive} = data.data
                setFormData({
                    type_id: type_id || 1,
                    title: title || '',
                    icon: icon || '',
                    price: price || 0,
                    archive: archive || 0,
                })
            } catch (error) {
                console.error(error)
                setErrors(error);
            }
        }

        fetchData()
    }, [id])

    const handleInputChange = (name,value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await servicesSchema.validate(formData, {abortEarly: false})
            if (id) {
                await api.put(`/services/${id}`, formData)
            } else {
                await api.post(`/services`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            const newErrors = {};
            console.error(error.message)
            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            if (error?.response?.data?.message) {
                newErrors['url'] = error?.response?.data?.message;
            }
            setErrors(newErrors);
        }
    }


    const selectOptions = [
        {value: 1, label: 'Включено / Не Включено'},
        {value: 2, label: 'Заметки'},
        {value: 3, label: 'Платные услуги'},
    ]

    const servicesSchema = object({
        title: string().required('Please enter a title'),
        icon: string().required('Please enter a icon'),
    })
    console.log(formData.type_id)
    return (
        <form className='flex flex-col gap-3 items-start' onSubmit={handleSubmit}>
            <CustomInput
                name='title'
                fn={(e)=>handleInputChange('title',e.target.value)}
                value={formData.title}
                label='Название услуги:'
                error={errors.title}
            />
            <CustomInput
                name='icon'
                fn={(e)=>handleInputChange('icon',e.target.value)}
                value={formData.icon}
                label='Иконка:'
                description='Укажите класс иконки услуги. Она будет выводиться на сайте внутри тура. Пример: "fa fa-ticket-alt https://fontawesome.com/'
                error={errors.icon}

            />
            <Select
                label="Название услуги*:"
                selectedKeys={new Set([formData.type_id])}
                onSelectionChange={(keys) => handleInputChange('type_id', keys.values().next().value)}
            >
                {selectOptions.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                        {el.label}
                    </SelectItem>
                ))}
            </Select>
            <CustomButton type='submit'>Save</CustomButton>
        </form>
    )
}

export default AdminServices
