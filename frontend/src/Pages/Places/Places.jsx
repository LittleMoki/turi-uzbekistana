'use client';
import {Container} from "@/Components/index.js";
import bg from '/public/newyear.jpg';
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function Places() {
    const {data: placesData} = useQuery({
        queryKey: ['places'],
        queryFn: () => api.get(`/places`),
        select: data => data.data.data
    });
    const {data: cityData} = useQuery({
        queryKey: ['citiesCount'],
        queryFn: () => api.get(`/city`),
        select: data => data.data.data
    });

    const [selectedCity, setSelectedCity] = useState(null);

    const handleCheckboxChange = (id) => {
        setSelectedCity(prevSelectedCity => (prevSelectedCity === id ? null : id));
    };
    const filteredPlaces = placesData?.filter(el => el.cityid === selectedCity);

    return (
        <section>
            <Container>
                <div className='py-10'>
                    <div
                        style={{
                            marginBottom: '3rem',
                            background: `linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),url("${bg.src}") center center no-repeat`
                        }}
                        className="w-full min-h-[400px] rounded-[20px] py-[10px] px-[30px] text-white flex flex-col gap-3 justify-evenly">
                        <h1 className='md:text-4xl sm:text-2xl text-xl font-medium'>
                            Достопримечательности Центральной Азии. Уникальная многовековая архитектура
                        </h1>
                        <form className="w-full">
                            <div className="flex flex-wrap gap-3 items-center">
                                {cityData?.filter(el=>el._count.t_place > 0).map((el) => (
                                    <label
                                        key={el.id}
                                        className={`backdrop-blur-lg border hover:bg-[#37AF24] transition px-[12px] py-[6px] rounded-[12px] cursor-pointer flex gap-2 items-center max-w-fit ${selectedCity === el.id ? 'bg-[#37AF24]' : 'bg-black/20'}`}
                                    >
                                        <input
                                            onChange={() => handleCheckboxChange(el.id)}
                                            className="hidden"
                                            type="checkbox"
                                            value={el.id}
                                            checked={selectedCity === el.id}
                                        />
                                        {el.name}
                                        <small>{el._count.t_place}</small>
                                    </label>
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className='grid gap-3 xl:grid-cols-6 md:grid-cols-4 grid-cols-3 max-[500px]:grid-cols-1'>
                        {
                            selectedCity !== null ? filteredPlaces?.map(el => (
                                <div className="flex flex-col relative overflow-hidden rounded-[30px]">
                                    <Link href={`/places/${el.url}`}>
                                        <div className="w-full h-full overflow-hidden">
                                            <Image width={1000} height={1000}
                                                   className='w-full h-full aspect-[3/4] object-cover scale-100'
                                                   src={`http://localhost:4000/uploads/${el.photo}`} alt={el.photo}/>
                                        </div>
                                        <h2
                                            style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 50%)'}}
                                            className="text-[18px] font-bold text-white absolute bottom-0 left-0 p-[12px] m-0 w-full h-full flex items-end justify-center">{el.name}</h2>
                                    </Link>
                                </div>
                            )) : placesData?.map(el => (
                                <div className="flex flex-col relative overflow-hidden rounded-[30px]">
                                    <Link href={`/places/${el.url}`}>
                                        <div className="w-full h-full overflow-hidden">
                                            <Image width={1000} height={1000}
                                                   className='w-full h-full aspect-[3/4] object-cover scale-100'
                                                   src={`http://localhost:4000/uploads/${el.photo}`} alt={el.photo}/>
                                        </div>
                                        <h2
                                            style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 50%)'}}
                                            className="text-[18px] font-bold text-white absolute bottom-0 left-0 p-[12px] m-0 w-full h-full flex items-end justify-center">{el.name}</h2>
                                    </Link>
                                </div>))
                        }
                    </div>
                </div>
            </Container>
        </section>
    )
        ;
}
