'use client'
import {Advantages} from '../../Models/MainModules/Advantages'
import {Articles} from '../../Models/MainModules/Articles'
import {HeroBlock} from '../../Models/MainModules/HeroBlock'
import {PopularDestinations} from '../../Models/MainModules/PopularDestinations'
import {RecomendedTours} from '../../Models/MainModules/RecomendedTours'
import {Reviews} from '../../Models/MainModules/Reviews'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {Spinner} from "@nextui-org/react";

const MainPage = () => {
    const {data: newsCards, isLoading: newsLoading} = useQuery({
        queryKey: ['newsCards'],
        queryFn: () => api.get(`/news/news/urlType`),
        select: data => data.data.data,
    });

    const {data: statiCards, isLoading: statiLoading} = useQuery({
        queryKey: ['statiCards'],
        queryFn: () => api.get(`/news/stati/urlType`),
        select: data => data.data.data,
    });

    const titleNews = newsCards?.map(el => el.type.title).splice(0,1).join('')
    const titleStati = statiCards?.map(el => el.type.title).splice(0,1).join('')

    return (
        <>
            <HeroBlock/>
            <Advantages/>
            <RecomendedTours/>
            <PopularDestinations/>
            <Reviews/>
            {newsLoading ?
                <div className='w-full h-[30vh] flex justify-center items-center'><Spinner size="lg"/></div>
                :
                newsCards?.length > 0 &&
                <Articles
                    title={titleNews}
                    btnName={'Все новости'}
                    btnLink='/news'
                    isBtn={true}
                    cards={newsCards}
                    maxData={3}
                />
            }

            {statiCards && statiLoading ?
                <div className='w-full h-[30vh] flex justify-center items-center'><Spinner size="lg"/></div>
                :
                statiCards?.length > 0 &&
                <Articles
                    title={titleStati}
                    btnName={'Все статьи'}
                    btnLink='/stati'
                    isBtn={true}
                    cards={statiCards}
                    style={{paddingBottom: '30px'}}
                    maxData={3}
                />
            }

        </>
    )
}

export default MainPage
