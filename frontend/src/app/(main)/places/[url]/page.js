import React from 'react'
import Places from "@/Pages/Places/Place.jsx";
import {api} from "@/Api/api.js";


export async function generateMetadata({ params }) {


    try {

        // Подключение к API для получения данных о стране
        const response = await api.get(`places/${params.url}/url`);
        const data = response.data.data;
        return {
            title: data?.name || '',
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


export default function Page() {
    return (
        <Places/>
    )
}
