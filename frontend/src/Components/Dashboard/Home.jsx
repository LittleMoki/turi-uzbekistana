'use client'

import { useParams } from 'next/navigation'
import AdminHeader from '@/Components/AdminHeader/AdminHeader'

const Home = ({ children }) => {
	const params = useParams()

	return (
		<main
			className='content-wrapper p-3'
			style={{ backgroundColor: '#343a40' }}
		>
			<AdminHeader params={params} />
			{children}
		</main>
	)
}

export default Home
