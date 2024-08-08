'use client'
import { Articles } from '@/Models/MainModules'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

const NewsPage = () => {
	const {data: newsData} = useQuery({
		queryKey: ['stati'],
		queryFn: () => api.get(`/news/stati/urlType`),
		select: data => data.data.data
	});
	const title = newsData?.map(el=>el.type.title).pop()
	const stati = newsData?.filter(el=>el.publick !== 0)

	return (
	<Articles
			title={title}
			btnName={'Все новости'}
			cards={...stati}
		/>
	)
}

export default NewsPage
