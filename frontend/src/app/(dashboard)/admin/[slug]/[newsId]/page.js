'use client'
import { api } from '@/Api/api'
import AdminTable from '@/Components/Table/Table'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const fetchData = async ({ params, setLoading }) => {
	try {
		const response = await api.get(`/news_type/${params.newsId}`)
		setLoading(false)
		return response.data.data.news // Return data from the response
	} catch (error) {
		setLoading(false)
		throw error // Throw error to be caught by the calling function
	}
}
const NewsPage = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const params = useParams()

	useEffect(() => {
		const fetchDataAndSetState = async () => {
			try {
				const fetchedData = await fetchData({ params, setLoading })
				setData(fetchedData)
			} catch (error) {
				setError(error.message)
			}
		}

		fetchDataAndSetState()
	}, [params.slug])

	const handleDelete = id => {
		const updatedItems = data.filter(item => item.id !== id)
		setData(updatedItems)
	}
	return (
		<section>
			{error ? (
				<div className='bg-white px-2 py-2 rounded-lg'>Error: {error}</div>
			) : (
				<AdminTable
					key={data.length}
					handleDelete={handleDelete}
					loading={loading}
					dataItems={data}
					params={params}
				/>
			)}
		</section>
	)
}

export default NewsPage
