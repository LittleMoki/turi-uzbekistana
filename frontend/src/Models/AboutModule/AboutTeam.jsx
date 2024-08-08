'use client'
import {Container} from "@/Components";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import Image from "next/image";

export const AboutTeam = () => {
    const {data} = useQuery({
        queryKey: ['about'],
        queryFn: () => api.get(`/about`),
        select: data => data.data.data
    });
    const about = data?.filter(el => el.publick !== 0).sort((a, b) => a.order_number - b.order);
    return (
        <section className="py-10">
            <Container>
                <h2 className="text-center text-3xl pb-5">Наша команда</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {about?.map((el, i) => (
                        <div
                            className="overflow-hidden rounded-md bg-white border"
                            key={i}
                        >
                            <Image width={500} height={500} src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
                                   alt={el.photo}/>
                            <div className="py-3 px-6 text-center flex flex-col items-center gap-1">
                                <h3>{el.name}</h3>
                                <small className="opacity-70">{el.position}</small>
                                <small>{el.employment}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
