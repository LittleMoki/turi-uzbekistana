import Tour from '@/Pages/Tour/Tour'
import { api } from "@/Api/api.js";

export async function generateMetadata({ params }) {
	try {
		// Подключение к API для получения данных о стране
		const response = await api.get(`tour/${params.tour}/url`);
		const data = response.data.data;
		return {
			title: data?.main_title || '',
			description: data?.metadescription || '',
			keywords: data?.metakeywords || '',
		};
	} catch (error) {
		console.error("Error fetching tour data:", error);
		// Возвращаем значения по умолчанию или обрабатываем ошибку другим способом
		return {
			title: 'Tour not found',
			description: 'The requested tour was not found',
			keywords: '',
		};
	}
}

const TourPage = () => {
	return <Tour />;
}

export default TourPage;
