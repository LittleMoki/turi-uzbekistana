'use client'

import AdminCity from '@/Components/AdminCity/AdminCity'
import AdminCountry from '@/Components/AdminCountry/AdminCountry'
import AdminExchange from '@/Components/AdminExchange/AdminExchange'
import AdminFaq from '@/Components/AdminFaq/AdminFaq'
import AdminNewsType from '@/Components/AdminNewsType/AdminNewsType'
import AdminPage from '@/Components/AdminPage/AdminPage'
import AdminPlace from '@/Components/AdminPlace/AdminPlace'
import AdminServices from '@/Components/AdminServices/AdminServices'
import AdminTeam from '@/Components/AdminTeam/AdminTeam'
import AdminUsers from '@/Components/AdminUsers/AdminUsers'
import { useParams } from 'next/navigation'
import AdminMainTour from "@/Components/AdminMainTour/AdminMainTour.jsx";
import AdminAbout from "@/Components/AdminAbout/AdminAbout.jsx";
import AdminHotel from "@/Components/AdminHotel/AdminHotel.jsx";
import AdminTourType from "@/Components/AdminTourType/AdminTourType.jsx";
import AdminOrders from "@/Components/AdminOrders/AdminOrders.jsx";

const Create = () => {
	const params = useParams()

	switch (params.slug) {
		case 'page':
			return <AdminPage />
		case 'services':
			return <AdminServices />
		case 'country':
			return <AdminCountry />
		case 'city':
			return <AdminCity />
		case 'places':
			return <AdminPlace />
		case 'faq':
			return <AdminFaq />
		case 'team':
			return <AdminTeam />
		case 'news_type':
			return <AdminNewsType />
		case 'users':
			return <AdminUsers />
		case 'exchange':
			return <AdminExchange />
		case 'tour':
			return <AdminMainTour />
		case 'about':
			return <AdminAbout />
		case 'hotel':
			return <AdminHotel />
		case 'tour_type':
			return <AdminTourType />
		default:
			return <h1>Not page</h1>
	}
}

export default Create
