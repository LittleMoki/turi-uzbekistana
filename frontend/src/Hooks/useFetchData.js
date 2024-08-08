import { api } from '@/Api/api'
import { useEffect, useState } from 'react'

const useFetchData = (endpoint, initialFormData) => {
	const [formData, setFormData] = useState(initialFormData)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (!endpoint) {
				setLoading(false)
				return
			}
			try {
				const { data } = await api.get(endpoint)
				setFormData({ ...initialFormData, ...data.data })
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [endpoint, initialFormData])

	return { formData, setFormData, error, loading }
}

export default useFetchData
