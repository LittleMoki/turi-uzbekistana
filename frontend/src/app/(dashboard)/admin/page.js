'use client'
import { api } from '@/Api/api'
import SmallBox from '@/UI/SmallBox'
import { useEffect, useState } from 'react'



const AdminPage = () => {
	const [data, setData] = useState({
		tour: 0,
		news: 0,
		country: 0,
		city: 0,
	})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [tourResponse, newsResponse, countryResponse, cityResponse] =
					await Promise.all([
						api.get('/tour'),
						api.get('/news'),
						api.get('/country'),
						api.get('/city'),
					])

				setData({
					tour: tourResponse.data.data.length,
					news: newsResponse.data.data.length,
					country: countryResponse.data.data.length,
					city: cityResponse.data.data.length,
				})
			} catch (err) {
				setError('Failed to fetch data')
				console.error('Failed to fetch data:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	return (
		<section>
			<h1 className='h3 mb-3 text-white'>Панель управления</h1>
			<div className='row'>
				<SmallBox
					color='blue'
					icon='fa-route'
					value={data.tour}
					label='Всего активных туров'
					link='/admin/tour'
				/>
				<SmallBox
					color='teal'
					icon='fa-newspaper'
					value={data.news}
					label='Всего статей'
					link='/admin/news_type'
				/>
				<SmallBox
					color='indigo'
					icon='fa-map-marked-alt'
					value={data.country}
					label='Всего стран'
					link='/admin/country'
				/>
				<SmallBox
					color='info'
					icon='fa-map'
					value={data.city}
					label='Всего городов'
					link='/admin/city'
				/>
			</div>
		</section>
	)
}

export default AdminPage
