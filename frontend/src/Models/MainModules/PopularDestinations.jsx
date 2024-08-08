'use client'
import { Container } from "@/Components";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/Api/api.js";
import Link from "next/link";
import Image from "next/image";

export const PopularDestinations = () => {
    const { data: tourCountry } = useQuery({
        queryKey: ['tourCountry'],
        queryFn: () => api.get(`/country`),
        select: data => data.data.data.filter(country => country.name !== 'Туркменистан') // Фильтруем Туркменистан
    });

    return (
        <section>
            <Container>
                <div className="flex justify-between items-center pb-4">
                    <h1 className="text-2xl">Популярные направления</h1>
                    <a href="/" className="flex items-center gap-2">
                        Смотреть все
                        <IoIosArrowRoundForward
                            className="border border-[#37af24] w-[25px] h-[25px] rounded-full hover:bg-[#37af24] hover:text-white"/>
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {tourCountry?.map((el, index) => (
                        <Link
                            key={index}
                            className={`${
                                index === 0 ? 'col-span-1 sm:col-span-2' :
                                    index === 5 ? 'col-span-1 lg:col-span-2' :
                                        'col-span-1'
                            } relative max-h-[150px] sm:max-h-[250px] overflow-hidden rounded-xl`}
                            href={`tour/${el.url}`}
                        >
                            <Image
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover"
                                src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
                                alt={el.photo}
                            />
                            <div
                                className="absolute bottom-[10px] left-[10px] backdrop-opacity-50 bg-white/75 py-[10px] px-[20px] rounded-xl">
                                <h3>{el.name}</h3>
                                <span className="flex items-center gap-1">
                                    <IoCompassOutline className="text-[#37af24] w-[20px] h-[20px]"/>
                                    {el.tour_country.length} туров
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};
