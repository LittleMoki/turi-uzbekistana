import Country from '@/Pages/Country/Country'
import {api} from "@/Api/api.js";



export async function generateMetadata({ params }) {
	const { country } = params;

	// Подключение к API для получения данных о стране
	const response = await api.get(`/country/${country}/url`);
	const data = response.data.data;

	return {
		title: data?.title || '',
		description: data?.metadescription || '',
		keywords: data?.metakeywords || '',
	};
}

const CountryPage = () => {
	return <Country />
}

export default CountryPage
