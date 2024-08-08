"use client"
import Article from '@/Pages/Article/Article'
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

const NewsNamePage = () => {
	const {statiName}= useParams()
	const {data: statiData} = useQuery({
		queryKey: ['statiPage'],
		queryFn: () => api.get(`/news/${statiName}/url`),
		select: data => data.data.data
	});
	return <Article {...statiData} newsType='stati'/>
}

export default NewsNamePage
