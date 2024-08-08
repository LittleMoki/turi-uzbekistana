'use client'
import {api} from '@/Api/api'
import CustomInput from '@/UI/CustomInput'
import {useParams, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Checkbox} from "@nextui-org/react";
import CustomButton from "@/UI/CustomButton.jsx";
import {number, object} from "yup";

const AdminExchange = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        symbol: '',
        exchange_rate: 0,
        primary_valuta: false,
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/exchange/${id}`)
                const {title, name, symbol, exchange_rate, primary_valuta} = data.data
                setFormData({
                    title: title || '',
                    name: name || '',
                    symbol: symbol || '',
                    exchange_rate: exchange_rate || 0,
                    primary_valuta: primary_valuta || false,
                })
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchData()
    }, [id])

    const handleInputChange = e => {
        const {name, value, type, checked} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]:
                type === 'checkbox'
                    ? checked
                    : name === 'exchange_rate'
                        ? Number(value)
                        : value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await exchangeSchema.validate(formData, {abortEarly: false})
            if (id) {
                await api.put(`/exchange/${id}`, formData)
            } else {
                await api.post(`/exchange`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            const newErrors = {};

            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }

    const exchangeSchema = object({
        exchange_rate: number().typeError('Please enter only number').required('Please enter exchange rate'),
    })

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <CustomInput
                name='title'
                fn={handleInputChange}
                value={formData.title}
                label='Название валюты:'
            />
            <CustomInput
                name='name'
                fn={handleInputChange}
                value={formData.name}
                label='Код валюты:'
            />
            <CustomInput
                name='symbol'
                fn={handleInputChange}
                value={formData.symbol}
                label='Символ*:'
            />
            <CustomInput
                name='exchange_rate'
                fn={handleInputChange}
                value={formData.exchange_rate}
                label='Курс валюты*:'
                error={errors.exchange_rate}
            />
            <Checkbox className='dark' name='primary_valuta' isSelected={formData.primary_valuta}
                      onChange={handleInputChange}>
                Сделать эту валюту главной?
            </Checkbox>
            <CustomButton type='submit'>Save</CustomButton>
        </form>
    )
}

export default AdminExchange
