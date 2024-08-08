'use client';
import { ArticleCard, BreadcrumbsComp, Container } from '@/Components';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { api } from "@/Api/api.js";
import { useParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const Country = () => {
    const { country } = useParams();
    const [activeCard, setActiveCard] = useState(null);

    const { data: countryData } = useQuery({
        queryKey: ['country', country],
        queryFn: () => api.get(`/country/${country}/url`),
        select: data => data.data.data
    });

    const { data: cityData, isLoading: cityLoading } = useQuery({
        queryKey: ['city'],
        queryFn: () => api.get(`/city`),
        select: data => data.data.data
    });

    const { data: newsData } = useQuery({
        queryKey: ['customsNews'],
        queryFn: () => api.get(`/news/news/urlType`),
        select: data => data.data.data
    });

    const { data: placeData } = useQuery({
        queryKey: ['places'],
        queryFn: () => api.get(`/places`),
        select: data => data.data.data
    });

    const places = placeData?.filter(el => el.country_id === countryData?.id);
    const news = newsData?.filter(el => el.publick !== 0);

    const breadcrumbs = [
        <Link key='1' href='/'>Главная</Link>,
        <Link key='2' href='/'>Страны</Link>,
        <Link key='3' href='/'>{countryData?.title}</Link>,
    ];

    const handleMouseEnter = index => setActiveCard(index);
    const handleMouseLeave = () => setActiveCard(null);

    if (cityLoading) {
        return <div className='w-full h-[50vh] flex justify-center items-center'><Spinner size="lg" /></div>;
    }

    return (
        <section>
            <div
                style={{ backgroundImage: `url('https://api.turi-uzbekistana.ru/uploads/${countryData?.photo}')` }}
                className="bg-no-repeat bg-cover bg-center bg-fixed h-[400px] relative">
                <div className="absolute flex justify-center items-center w-full h-full bg-black/60">
                    <h1 className="text-white md:text-4xl sm:text-3xl text-2xl px-3 text-center">
                        {countryData?.title}
                    </h1>
                </div>
            </div>
            <Container>
                <BreadcrumbsComp breadcrumb={breadcrumbs} />
                <div dangerouslySetInnerHTML={{ __html: countryData?.description }} />

                {Array.isArray(cityData) && cityData.some(el => el.country.url === countryData?.url) && (
                    <>
                        <h3 className="text-2xl pt-10 pb-3 font-medium text-center">
                            Города {countryData?.name}
                        </h3>
                        <div className="grid max-[420px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-5 gap-4">
                            {cityData?.filter(el => el.country.url === countryData?.url).map((el) => (
                                <div
                                    onMouseEnter={() => handleMouseEnter(el.id)}
                                    onMouseLeave={handleMouseLeave}
                                    key={el.id}
                                    className="relative overflow-hidden rounded-2xl cursor-pointer">
                                    <img src={`http://localhost:4000/uploads/${el.photo}`} alt={el.name} />
                                    <div
                                        className={`absolute w-full h-full top-0 left-0 flex justify-center items-center text-white bg-black/40 duration-200 ${
                                            activeCard === el.id ? 'opacity-0' : 'opacity-1'
                                        }`}>
                                        <h2 className="text-2xl">{el.name}</h2>
                                    </div>
                                    <div
                                        className={`absolute w-full h-full top-0 left-0 flex justify-center items-center text-white bg-black/40 duration-200 ${
                                            activeCard === el.id ? 'opacity-1' : 'opacity-0'
                                        }`}>
                                        <Link
                                            className="border border-white py-3 px-12 rounded-xl text-xl hover:bg-white/30"
                                            href={`/country/${country}/${el.url}`}>
                                            Все города
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex justify-center items-center w-full pt-5">
                    <Link className="text-white bg-[#37AF24] px-5 py-2 rounded-xl" href={`/tour/${countryData?.url}`}>
                        Туры в {countryData?.name}
                    </Link>
                </div>

                {places?.length > 0 && (
                    <h3 className="text-2xl text-center py-5">
                        Достопримечательности {countryData?.name}
                    </h3>
                )}

                <h3 className="text-2xl text-center py-5">Популярные статьи</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {news?.slice(0,3).map((el, i) => (
                        <ArticleCard {...el} key={i} />
                    ))}
                </div>

                <div className="flex justify-center py-5">
                    <Link className="text-white bg-[#37AF24] px-5 py-2 rounded-xl" href={`/tour/${countryData?.url}`}>
                        Туры в {countryData?.name}
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default Country;
