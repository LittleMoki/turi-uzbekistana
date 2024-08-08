'use client'
import Article from '@/Pages/Article/Article'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useParams} from "next/navigation";

const NewsNamePage = () => {
	const {newsName}= useParams()
	const {data: newsData} = useQuery({
		queryKey: ['newsPage'],
		queryFn: () => api.get(`/news/${newsName}/url`),
		select: data => data.data.data
	});
	return <Article {...newsData} newsType='news'/>
}

export default NewsNamePage
