'use client'
import {ArticleCard, BreadcrumbsComp, Container} from "@/Components";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useParams} from "next/navigation";
import {divider} from "@nextui-org/react";

const City = () => {
    const {city} = useParams()
    const breadcrumbs = [
        <Link href="/">Главная</Link>,
        <Link href="/">Страны</Link>,
        <Link href="/">Узбекистан</Link>,
    ];
    const {data: cityData} = useQuery({
        queryKey: ['city'],
        queryFn: () => api.get(`/city/${city}/url`),
        select: data => data.data.data
    });
    const {data: placeData} = useQuery({
        queryKey: ['places'],
        queryFn: () => api.get(`/places`),
        select: data => data.data.data
    });

    const {data:newsData} = useQuery({
        queryKey: ['customsNews'],
        queryFn: () => api.get(`/news/news/urlType`),
        select: data => data.data.data
    });

    const news = newsData?.filter(el=>el.publick !== 0)

    const places = placeData?.filter(el => el.city.url === cityData?.url)

    return (
        <>
            <section
                style={{
                    backgroundImage: `url('http://localhost:4000/uploads/${cityData?.photo}')`,
                }}
                className="bg-no-repeat bg-cover bg-center bg-fixed h-[400px] relative">
                <div className="absolute flex justify-center items-center w-full h-full bg-black/60">
                    <h1 className="text-white md:text-4xl sm:text-3xl text-2xl px-3 text-center">
                        {cityData?.title}
                    </h1>
                </div>
            </section>
            <section>
                <Container>
                    <BreadcrumbsComp breadcrumb={breadcrumbs}/>
                    <div dangerouslySetInnerHTML={{__html: cityData?.body}}
                         style={{
                             all: 'unset', /* Удалить все стили из HTML-контента */
                             padding: 0,
                             margin: 0,
                         }}/>
                    {
                        places?.length > 0 && (
                            <div className='py-5'>
                                <h3 className="text-2xl text-center pb-2">
                                    Достопримечательности
                                </h3>
                                <div className='grid bg-[#efefef] rounded-[20px] p-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                                    {places?.map(el => (
                                        <Link className='hover:underline' href={`/places/${el.url}`}>&gt;{el.name}</Link>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    <h3 className="text-2xl text-center">Популярные статьи</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                        {news?.slice(0,3).map((el, i) => (
                            <ArticleCard {...el} key={i}/>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default City;
