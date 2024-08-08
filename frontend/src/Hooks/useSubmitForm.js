import { api } from '@/Api/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useSubmitForm = () => {
	const router = useRouter()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (
		endpoint,
		formData,
		method = 'post',
		redirectUrl = ''
	) => {
		setLoading(true)
		try {
			if (method === 'put') {
				await api.put(endpoint, formData)
			} else {
				await api.post(endpoint, formData)
			}
			if (redirectUrl) {
				router.push(redirectUrl)
			}
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return { handleSubmit, error, loading }
}

export default useSubmitForm
