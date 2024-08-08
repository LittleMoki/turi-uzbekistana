import Tours from "@/Pages/Tours/Tours.jsx";
import {api} from "@/Api/api.js";
import {useQuery} from "@tanstack/react-query";

export async function generateMetadata({ params }) {
	// Подключение к API для получения данных о стране


	const response = await api.get(`/tour_type`);
	const data = response.data.data.filter(el => el.url === params.tourType)[0];

	return {
		title: data?.title || '',
		description: data?.metadescription || '',
		keywords: data?.metakeywords || '',
	};
}

const TourTypePage = () => {
	return <Tours />
}

export default TourTypePage
