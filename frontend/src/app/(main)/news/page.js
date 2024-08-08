'use client'
import { Articles } from '@/Models/MainModules'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

const NewsPage = () => {
	const {data: newsData} = useQuery({
		queryKey: ['news'],
		queryFn: () => api.get(`/news/news/urlType`),
		select: data => data.data.data
	});
	const title = newsData?.map(el=>el.type.title).pop()
	const news = newsData?.filter(el=>el.publick !== 0)

	return (
		<Articles
			title={title}
			btnName={'Все новости'}
			cards={news}
		/>
	)
}

export default NewsPage
