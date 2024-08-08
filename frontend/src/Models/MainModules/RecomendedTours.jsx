'use client'
import {Card, Container} from "@/Components";
import {api} from "@/Api/api.js";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import {Spinner} from "@nextui-org/react";

export const RecomendedTours = () => {
    // Получаем данные о турах
    const {data, isLoading} = useQuery({
        queryKey: ['tourCards'],
        queryFn: () => api.get(`/tour`),
        select: data => data.data.data
    });

    // Получаем данные о странах
    const {data: tourCountry} = useQuery({
        queryKey: ['tourCountry'],
        queryFn: () => api.get(`/country`),
        select: data => data.data.data
    });

    // Фильтруем туры, чтобы исключить архивные и неактивные туры
    const filteredData = data?.filter(el => el.archive !== 1 && el.intop !== 0);

    // Состояние для выбранной страны
    const [selectedTour, setSelectedTour] = useState(null);

    // Обработчик изменения выбранной страны
    const handleLabelChange = (id) => {
        setSelectedTour(prevSelectedTour => (prevSelectedTour === id ? id : id));
    };

    // Фильтруем туры по выбранной стране
    const filteredTours = selectedTour
        ? filteredData?.filter(tour => tour?.country === null? tour.tour_country[0].country.id.includes(selectedTour):tour?.country.includes(selectedTour))  // Здесь предполагается, что `country` - это массив с id стран
        : filteredData;


    // Ограничиваем количество отображаемых карточек до 7
    const limitedTours = filteredTours?.slice(0, 7);

    // Получаем данные о стране по выбранному id
    const countryCard = tourCountry?.filter(el => el.id === selectedTour);

    // Устанавливаем «Узбекистан» в качестве выбранной страны по умолчанию
    useEffect(() => {
        if (tourCountry) {
            const uzbekistan = tourCountry.find(el => el.name === 'Узбекистан');
            if (uzbekistan) {
                setSelectedTour(uzbekistan.id);
            }
        }
    }, [tourCountry]);

    return (
        <section className="py-12">
            <Container>
                <h1 className="text-3xl mb-2">Рекомендуемые туры</h1>
                <ul className="flex gap-2 flex-wrap">
                    {
                        tourCountry?.map(el => (
                            <li
                                key={el.id}
                                onClick={() => handleLabelChange(el.id)}
                                className={`${selectedTour === el.id ? 'bg-[#15803D] text-white' : 'bg-white'} py-1 px-3 rounded-lg hover:bg-[#15803D] hover:text-white transition-colors cursor-pointer`}>
                                {el.name}
                            </li>
                  ))
                    }
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-5 gap-6">
                    {isLoading && (
                        <div className='col-span-5 h-[300px] flex justify-center items-center'>
                            <Spinner size='lg'/>
                        </div>
                    )}
                    {limitedTours?.map((el, i) => (
                        <Card {...el} key={i}/>
                    ))}
                    {
                        countryCard?.length > 0 ? countryCard?.map(el => (
                            <div className="relative min-h-[300px] cursor-pointer rounded-xl overflow-hidden" key={el.id}>
                                <div className="z-[-1] absolute top-0 left-0 w-full h-full bg-[#000] opacity-40"></div>
                                <Image
                                    width={1000}
                                    height={1000}
                                    className="object-cover z-[-2] w-full h-full"
                                    src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
                                    alt="bg_image"
                                />
                                <div className="flex flex-col gap-3 text-white absolute bg-black/40 h-full bottom-0 w-full justify-end items-center py-[20px] px-[10px]">
                                    <h2 className="text-2xl">{el.name}</h2>
                                    <Link
                                        className="bg-[#15803D] py-[10px] px-[15px] w-full text-center rounded-xl font-semibold hover:bg-[#166534] transition-colors"
                                        href={`/tour/${el.url}`}
                                    >
                                        Смотреть все туры
                                    </Link>
                                </div>
                            </div>
                        )) : ''
                    }
                </div>
            </Container>
        </section>
    );
};
