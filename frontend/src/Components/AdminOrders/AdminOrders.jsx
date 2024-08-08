import React, {useEffect, useState} from 'react'
import {useParams, useRouter} from "next/navigation.js";
import {api} from "@/Api/api.js";
import CustomInput from "@/UI/CustomInput.jsx";
import CustomButton from "@/UI/CustomButton.jsx";

export default function AdminOrders() {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        travellers_count: 0,
        tour_date_start: '',
        tour_date_end: '',
        price: 0,
        deposit: 0,
        balance: 0,
        total_price: 0,
        total_paid_price: 0,
        payment_type: '',
        tour_type: '',
    })
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/orders/${id}`)
                const {
                    travellers_count,
                    tour_date_start,
                    tour_date_end,
                    price,
                    deposit,
                    balance,
                    total_price,
                    total_paid_price,
                    payment_type,
                    tour_type,
                } = data.data
                setFormData({
                    travellers_count: travellers_count || 0,
                    tour_date_start: tour_date_start || 0,
                    tour_date_end: tour_date_end || 0,
                    price: price || 0,
                    deposit: deposit || 0,
                    balance: balance || 0,
                    total_price: total_price || 0,
                    total_paid_price: total_paid_price || 0,
                    payment_type: payment_type || '',
                    tour_type: tour_type || '',
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
            [name]: name !== 'payment_type' && name !== 'tour_type' ? Number(value): value,

        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (id) {
                await api.put(`/orders/${id}`, formData)
            } else {
                await api.post(`/orders`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            setError(error.message)
        }
    }

    if (error) {
        return (
            <div className='pt-3'>
                <p>{error}</p>
            </div>
        )
    }


    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <CustomInput
                name='travellers_count'
                fn={handleInputChange}
                value={formData.travellers_count}
                label='travellers count'
            />
            <CustomInput
                name='tour_date_start'
                fn={handleInputChange}
                value={formData.tour_date_start}
                label='tour_date_start'
            />
            <CustomInput
                name='tour_date_end'
                fn={handleInputChange}
                value={formData.tour_date_end}
                label='tour_date_end'
            />
            <CustomInput
                name='price'
                fn={handleInputChange}
                value={formData.price}
                label='price'
            />
            <CustomInput
                name='deposit'
                fn={handleInputChange}
                value={formData.deposit}
                label='deposit'
            />
            <CustomInput
                name='balance'
                fn={handleInputChange}
                value={formData.balance}
                label='balance'
            />
            <CustomInput
                name='total_price'
                fn={handleInputChange}
                value={formData.total_price}
                label='total_price'
            />
            <CustomInput
                name='total_paid_price'
                fn={handleInputChange}
                value={formData.total_paid_price}
                label='total_paid_price'
            />
            <CustomInput
                name='payment_type'
                fn={handleInputChange}
                value={formData.payment_type}
                label='payment_type'
            />
            <CustomInput
                name='tour_type'
                fn={handleInputChange}
                value={formData.tour_type}
                label='tour_type'
            />
            <CustomButton type='submit'>Save</CustomButton>
        </form>
    )
}
