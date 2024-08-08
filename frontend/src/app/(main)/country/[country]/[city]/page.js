import City from "@/Pages/City/City.jsx";
import {api} from "@/Api/api.js";

export async function generateMetadata({ params }) {
    const { city } = params;
    // Подключение к API для получения данных о стране
    const response = await api.get(`/city/${city}/url`);
    const data = response.data.data;
    return {
        title: data?.title || '',
        description: data?.metadescription || '',
        keywords: data?.metakeywords || '',
    };
}

export default function Page() {
    return (
        <City/>
    )
}
