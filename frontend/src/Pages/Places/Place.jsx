"use client"
import {BreadcrumbsComp, Container} from "@/Components/index.js";
import Image from "next/image";
import {FaOdnoklassniki, FaTelegram, FaVk} from "react-icons/fa";
import {PiPinterestLogoBold} from "react-icons/pi";
import {Button, FormControl, FormHelperText, Input, InputLabel, TextareaAutosize} from "@mui/material";
import Link from "next/link";
import formBg from '/public/banner-2.jpg'
import banner1 from '/public/zvezda_vostoka.png'
import banner2 from '/public/may-holidays.png'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useParams} from "next/navigation";

export default function Place() {
    const {url} = useParams();
    const breadcrumbs = [
        <Link href='/' key='1'>
            Главная
        </Link>,
        <Link href='/' key='2'>
            Популярные статьи о Узбекистане наших авторов, путешественников
        </Link>,
        <Link href='/' key='3'>
            Магнитная привлекательность Узбекистана: рай для путешественников с
            Minzifa Travel
        </Link>,
    ]
    const {data: placeData} = useQuery({
        queryKey: ['place'],
        queryFn: () => api.get(`/places/${url}/url`),
        select: data => data.data.data
    });

    return (
        <section>
            <Container>
                <BreadcrumbsComp breadcrumb={breadcrumbs}/>
                <div className='flex lg:flex-row flex-col  gap-5'>
                    <div className='flex w-full flex-col items-center'>
                        <div className='relative w-full max-h-[400px] rounded-2xl overflow-hidden'>
                            <Image
                                className='w-full h-full object-cover brightness-50'
                                src={`https://api.turi-uzbekistana.ru/uploads/${placeData?.photo}`}
                                alt={'20231208500127172.jpg'}
                                width={1000}
                                height={1000}
                            />
                            <div
                                className='w-full h-full absolute top-0 left-0 flex justify-center items-center sm:px-20 px-2 text-white text-center'>
                                <h1 className='lg:text-3xl md:text-2xl sm:text-xl font-bold'>
                                    {placeData?.name}
                                </h1>
                            </div>
                        </div>
                        <div
                            className='bg-white w-full max-w-[800px] p-5 rounded-2xl shadow-lg lg:mt-[-60px] sm:mt-[-40px] mt-0 relative z-1'>
                            <ul className='flex justify-center flex-wrap items-center gap-5 pb-3'>
                                <li className='flex items-center gap-2'>
                                    <i className='fas fa-globe-asia'/>
                                    {placeData?.country.name}
                                </li>
                                <li className='flex items-center gap-2'>
                                    <i className='fas fa-map-signs'/>
                                    {placeData?.city.name}
                                </li>
                            </ul>
                            <div dangerouslySetInnerHTML={{__html: placeData?.body}}/>
                            <hr className='h-1 border-0 bg-gray-200'/>
                            <div className='pt-5 flex sm:justify-start justify-center  flex-wrap items-center gap-5'>
                                <h3 className='lg:text-3xl sm:text-2xl text-xl'>Поделиться:</h3>
                                <ul className='flex items-center gap-2'>
                                    <li className='bg-[#07f] p-2 rounded-full text-white'>
                                        <FaVk className='h-4 w-4'/>
                                    </li>
                                    <li className='bg-[#f70] p-2 rounded-full text-white'>
                                        <FaOdnoklassniki className='h-4 w-4'/>
                                    </li>
                                    <FaTelegram className='h-8 w-8 text-[#64a9dc]'/>
                                    <li className='bg-[#c20724] p-2 rounded-full text-white'>
                                        <PiPinterestLogoBold className='h-4 w-4 '/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='lg:max-w-[300px]'>
                        <div
                            className='top-[120px] right-0 sticky grid flex-row lg:flex-col gap-5 lg:flex max-[420px]:grid-cols-1 grid-cols-2'>
                            <Image
                                src={banner1}
                                alt={banner1}
                                className='rounded-3xl overflow-hidden'
                            />
                            <Image
                                src={banner2}
                                alt={banner2}
                                className='rounded-3xl overflow-hidden'
                            />
                        </div>
                    </div>
                </div>
                <div className='my-10 w-full flex lg:flex-row flex-col rounded-xl overflow-hidden'>
                    <div className='w-full lg:hidden block'>
                        <Image
                            src={formBg}
                            alt={formBg}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='bg-white p-5 shadow-xl w-full '>
                        <h1 className='text-2xl'>Ищите путешествие?</h1>
                        <p className='pb-5 text-sm'>
                            Организуем путешествие мечты согласно вашему пожеланию, которое
                            запомнится вам на всю жизнь!
                        </p>
                        <div className='flex flex-col gap-3'>
                            <FormControl className='w-full'>
                                <InputLabel htmlFor='name'>Имя</InputLabel>
                                <Input id='name' aria-describedby='my-name'/>
                                <FormHelperText id='my-name'>Введите ваше имя</FormHelperText>
                            </FormControl>
                            <FormControl className='w-full'>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <Input id='email' aria-describedby='my-email'/>
                                <FormHelperText id='my-email'>
                                    Введите ваше email
                                </FormHelperText>
                            </FormControl>
                            <InputLabel htmlFor='opinion'>Пожелания:</InputLabel>
                            <TextareaAutosize
                                className='w-full'
                                minRows={2}
                                maxRows={'2'}
                                id='opinion'
                                placeholder='Напишите ваши пожелания...'
                            />
                            <Button
                                className='text-whites'
                                style={{
                                    color: 'white',
                                    background: '#198754',
                                }}
                            >
                                Отправить
                            </Button>
                            <small className='text-center px-5'>
                                Нажимая на кнопку Вы даете согласие на обработку персональных
                                данных и соглашаетесь с{' '}
                                <a className='underline' href='/'>
                                    Политикой конфиденциальности
                                </a>
                            </small>
                        </div>
                    </div>
                    <div className='max-w-[700px] lg:block hidden'>
                        <Image
                            src={formBg}
                            alt={formBg}
                            loading='lazy'
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}
