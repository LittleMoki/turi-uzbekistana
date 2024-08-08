'use client'
import {api} from '@/Api/api'
import CustomInput from '@/UI/CustomInput'
import {useParams, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Checkbox} from "@nextui-org/react";
import CustomButton from "@/UI/CustomButton.jsx";
import CustomEditor from "@/UI/CustomEditor.jsx";

const AdminFaq = () => {
    const router = useRouter()
    const {id, slug} = useParams()
    const [formData, setFormData] = useState({
        name: '', description: '', archive: 0,
    })
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const {data} = await api.get(`/faq/${id}`)
                const {name, description, archive} = data.data
                setFormData({
                    name: name || '', description: description || '', archive: archive || 0,
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
            ...prevState, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }))
    }
    const handleEditorChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (id) {
                await api.put(`/faq/${id}`, formData)
            } else {
                await api.post(`/faq`, formData)
            }
            router.push(`/admin/${slug}`)
        } catch (error) {
            setError(error.message)
        }
    }

    if (error) {
        return (<div className='pt-3'>
            <p>{error}</p>
        </div>)
    }

    return (<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <CustomInput
            name='name'
            fn={handleInputChange}
            value={formData.name}
            label='Вопрос'
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
        <Checkbox className='dark' name='archive' isSelected={formData.archive === 1} onChange={handleInputChange}>
            Перенести тур в архив
        </Checkbox>
        <CustomButton type='submit'>Save</CustomButton>
    </form>)
}

export default AdminFaq
