'use client'
import Article from "@/Pages/Article/Article.jsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useParams} from "next/navigation";

export default function Page() {
    const {customUrl} = useParams()
    console.log(customUrl)
    const {data} = useQuery({
        queryKey: ['customsNewsArticle'],
        queryFn: () => api.get(`/news/${customUrl}/url`),
        select: data => data.data.data
    });
    return (
        <Article {...data} newsType='customs'/>
    )
}
