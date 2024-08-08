'use client'

import {BreadcrumbsComp, Card, Container} from '@/Components'
import Link from 'next/link'
import {ToursFilter} from '../../Models/ToursModules/ToursFilter'
import {ToursTop} from '../../Models/ToursModules/ToursTop'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useParams} from "next/navigation";
import {useState} from "react";

const Tours = () => {
    const [filterByDay, setFilterByDay] = useState(1)
    const [typesFilter, setTypesFilter] = useState([]);
    const [moneyFilter, setMoneyFilter] = useState([0, 7000]);
    const [dayFilter, setDayFilter] = useState([0, 21]);
    const {data, isLoading, error} = useQuery({
        queryKey: ['tours'],
        queryFn: () => api.get(`/tour`),
        select: data => data.data.data
    });

    const {tourType} = useParams()
    const {data: cardsTourType, isLoading: cardsTourTypeLoading} = useQuery({
        queryKey: ['cardsTourType'],
        queryFn: () => api.get(`/tour_type`),
        select: data => data.data.data,
    });
    const {data: countries, isLoading: countriesLoading} = useQuery({
        queryKey: ['countries'],
        queryFn: () => api.get(`/country`),
        select: data => data.data.data,
    });
    const {data: tourTypeUrl, isLoading: tourTypeUrlLoading} = useQuery({
        queryKey: ['tourTypeUrl'],
        queryFn: () => api.get(`/tour_type/${tourType}/url`),
        select: data => data.data.data,
    });

    const filteredTourTypesCountry = cardsTourType?.filter(tourType =>
        countries?.some(country => country.url === tourType.url)
    );
    const seasons = ['winter', 'summer', 'spring', 'autumn', 'all_season'];

    const filteredTourTypesSeason = cardsTourType?.filter(tourType => {
        // Проверяем, содержит ли URL какой-либо из сезонов
        return seasons.some(season => tourType.url.includes(season));
    });

    const excludedTypes = new Set([
        ...(filteredTourTypesCountry?.map(type => type.id) || []),
        ...(filteredTourTypesSeason?.map(type => type.id) || [])
    ]);

    const TourTypeBase = cardsTourType?.filter(el => !excludedTypes.has(el.id)) || [];

    const breadcrumbs = [
        <Link key='1' href='/'>
            Главная
        </Link>,
        <Link key='2' href='/'>
            Туры
        </Link>,
    ]

    const tourTypeFilter = data?.filter(el =>
        el.type.url === tourType &&
        el.price >= moneyFilter[0] &&
        el.price <= moneyFilter[1] &&
        el.tourtoday.length >= dayFilter[0] &&
        el.tourtoday.length <= dayFilter[1]
    );

    const tourTypeFilterTypes = tourTypeFilter?.filter(el => typesFilter?.some(id => el.types.includes(id)))

    const tourCountryUrl = data?.filter(el =>
        el.tour_country.some(tourCountry => tourCountry.country.url === tourType) &&
        el.price >= moneyFilter[0] &&
        el.price <= moneyFilter[1] &&
        el.tourtoday.length >= dayFilter[0] &&
        el.tourtoday.length <= dayFilter[1]
    );

    const tourCountryUrlTypes = tourCountryUrl?.filter(el => typesFilter?.some(id => el.types.includes(id)))

    const allPageCards = data?.filter(el =>
        el.price >= moneyFilter[0] &&
        el.price <= moneyFilter[1] &&
        el.tourtoday.length >= dayFilter[0] &&
        el.tourtoday.length <= dayFilter[1]
    );

    const filterAllCards = allPageCards?.filter(el =>
        typesFilter?.some(id => el.types.includes(id))
    )

    const cardsToDisplay = filterAllCards?.length > 0 && tourType === undefined
        ? filterAllCards
        : tourTypeFilterTypes?.length > 0
            ? tourTypeFilterTypes
            : tourTypeFilter?.length > 0
                ? tourTypeFilter
                : tourCountryUrlTypes?.length > 0
                    ? tourCountryUrlTypes
                    : (tourType !== undefined || tourCountryUrl?.length > 0)
                        ? tourCountryUrl
                        : allPageCards;

    // Определяем длину массива карт после фильтрации
    const cardsLength = cardsToDisplay?.filter(el => el.tourtoday.length >= filterByDay)?.length || 0;


    return (
        <>
            <ToursTop setFilterByDay={setFilterByDay} tourType={tourType} TourTypeBase={TourTypeBase}
                      tourTypeUrl={tourTypeUrl}/>
            <Container>
                <section className='md:flex-row flex-col gap-10 flex py-5'>
                    <div>
                        <BreadcrumbsComp breadcrumb={breadcrumbs}/>

                        <ToursFilter
                            tourType={tourType}
                            dayFilter={dayFilter}
                            setDayFilter={setDayFilter}
                            moneyFilter={moneyFilter}
                            setMoneyFilter={setMoneyFilter}
                            typesFilter={typesFilter}
                            setTypesFilter={setTypesFilter}
                            filteredTourTypesCountry={filteredTourTypesCountry}
                            filteredTourTypesSeason={filteredTourTypesSeason}
                            TourTypeBase={TourTypeBase}
                        />
                    </div>
                    <div>
                        <h3 className='text-2xl pb-3'>Найдено {cardsLength} тура</h3>
                        <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                            {
                                cardsToDisplay?.filter(el => el.tourtoday.length >= filterByDay)?.map(el => (
                                    <Card {...el} key={el.id}/>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
}
export default Tours
