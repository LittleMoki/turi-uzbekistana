'use client'
import {useEffect, useState} from 'react'
import {BreadcrumbsComp, Container} from '@/Components'
import {TourRoute, TourSwiper} from '@/Models/TourModule'
import Link from 'next/link'
import {TourApplication} from '../../Models/TourModule/TourApplication'
import {TourBook} from '../../Models/TourModule/TourBook'
import {TourDescription} from '../../Models/TourModule/TourDescription'
import {TourForm} from '../../Models/TourModule/TourForm'
import {TourFormPopup} from '../../Models/TourModule/TourFormPopup'
import {TourHotels} from '../../Models/TourModule/TourHotels'
import {TourInclude} from '../../Models/TourModule/TourInclude'
import {TourInfoRoute} from '../../Models/TourModule/TourInfoRoute'
import {TourOrganization} from '../../Models/TourModule/TourOrganization'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useParams} from "next/navigation";
import Faq from "@/Models/MainModules/Faq.jsx";

const Tour = () => {
    const {tour} = useParams()
    const [uniqueHotel, setUniqueHotel] = useState([])
    const {data, isLoading, error} = useQuery({
        queryKey: ['tour', tour],
        queryFn: () => api.get(`/tour/${tour}/url`),
        select: data => data.data
    });
    useEffect(() => {
        const hotel = data?.data?.tourtoday?.filter(el => el.hotels).map(el => el.hotels);
        if (hotel) {
            // Объединяем все массивы в один
            const mergedArray = [].concat(...hotel);
            // Удаляем дубликаты
            const uniqueArray = [...new Set(mergedArray)];
            setUniqueHotel(uniqueArray);
        }
    }, [data]);
    const breadcrumbs = [
        <Link key='1' href='/'>
            Главная
        </Link>,
        <Link key='2' href='/'>
            Туры
        </Link>,
        <Link key='3' href='/'>
            Индивидуальные туры в Узбекистан
        </Link>,
        <Link key='4' href='/'>
            Тур в Узбекистан «Четыре жемчужины Узбекистана» Премиальный
        </Link>,
    ]

    // Application function for close and open as popUp
    const [application, setApplication] = useState(false)
    const applicationPopup = () => {
        setApplication(!application)
    }
    const faqs = data?.data?.tour_faqs.map(el => el.faq)


    return (
        <>
            {/* BreadCrumbsComp */}
            <BreadcrumbsComp breadcrumb={breadcrumbs}/>
            {/* TourApplication */}
            <TourApplication {...data} fn={applicationPopup}/>
            <section className='container max-w-[1320px] px-3 mx-auto flex gap-5 flex-col lg:flex-row pt-5'>
                {/* TourSwiper */}
                <TourSwiper {...data}/>
                {/* TourInfoRoute */}
                <TourInfoRoute {...data}/>
            </section>
            {/* TourDescription */}
            <TourDescription {...data}/>
            {/* TourForm */}
            <TourForm/>
            {/* TourRoute */}
            <TourRoute {...data}/>
            {/* TourInclude */}
            <TourInclude {...data}/>
            {/* TourHotels */}
            <TourHotels hotelId={uniqueHotel}/>
            {/* TourBook */}
            <TourBook {...data}/>
            {/* TourOrganization */}
            <TourOrganization/>
            <div className='container max-w-[1320px] px-3 mx-auto pt-10'>
                <h3 className='text-2xl font-medium text-center'>
                    Отзывы наших туристов
                </h3>
                Here Will be Reviews
            </div>
            <Faq faqs={faqs}/>
            {/* TourPopular */}
            {/*<TourPopular cards={cards} />*/}
            {/* TourFormPopup */}
            <TourFormPopup />
        </>
    )
}

export default Tour
