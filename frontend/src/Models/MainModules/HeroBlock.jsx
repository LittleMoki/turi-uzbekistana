import Link from 'next/link'
import {AiOutlineGlobal} from 'react-icons/ai'
import {FaCalendar} from 'react-icons/fa'
import {IoSearch} from 'react-icons/io5'
import backgroundImage from '../../../public/home-banner.jpg'
import { Select, SelectItem} from "@nextui-org/react";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

export const HeroBlock = () => {
    const date = [
        {
            key: "winter",
            label: "Зимой",
        },
        {
            key: "spring",
            label: "Весной",
        },
        {
            key: "summer",
            label: "Летом",
        },
        {
            key: "autumn",
            label: "Осенью",
        },
    ]
    const {data: countryData} = useQuery({
        queryKey: ['countriesMain'],
        queryFn: () => api.get(`/country`),
        select: data => data.data.data
    });
    return (
        <section
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${backgroundImage.src})`,
                backdropFilter: 'blur(8px)',
                backgroundPosition: 'center center'
            }}
            className={`hero h-[550px] flex flex-col justify-center relative text-white`}>
            <div className='container max-w-[1140px] px-2 flex flex-col gap-5 items-start mx-auto'>
                <h1 className='sm:text-4xl text-2xl font-bold text-[#ffeb3b] max-w-[1140px]'>
                    Экскурсионные туры по Узбекистану и Центральной Азии от Экспертов по
                    путешествиям
                </h1>
                <h2 className='text-base font-semibold'>
                    История, культура, природа и гастрономические удовольствия ждут вас в
                    путешествиях.
                </h2>
                <div className='flex lg:max-w-[600px] w-full flex-col items-end'>
                    <div
                        className='text-[#475566] rounded-3xl lg:rounded-full w-full gap-3 p-5 bg-[#ffffff99]  grid lg:grid-cols-3 grid-cols-1'>
                        <Select
                            startContent={<i className='fas fa-globe'/>}
                            placeholder="Куда вы хотите?"
                        >
                            {countryData?.map(el => (
                                <SelectItem key={el.id}>{el.name}</SelectItem>
                            ))}
                        </Select>
                        <Select
                            startContent={<i className='fas fa-calendar'/>}
                            items={date}
                            placeholder="В каком сезоне?"
                        >
                            {(el) => <SelectItem>{el.label}</SelectItem>}
                        </Select>
                        <button
                            className='bg-[#37af24] text-white flex items-center justify-center py-2 text-lg font-normal rounded-full'>
                            <IoSearch/> Найти
                        </button>
                    </div>
                    <Link className='pt-3 pr-5' href='/tour'>
                        Смотреть туры
                    </Link>
                </div>
            </div>
        </section>
    )
}
