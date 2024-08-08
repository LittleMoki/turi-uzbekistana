'use client'
import {ApplicationLogo} from '@/UI/ApplicationLogo'
import Link from 'next/link'
import {
    FaEnvelope,
    FaOdnoklassniki,
    FaPhone,
    FaPinterest,
    FaTelegram,
    FaVk,
    FaWhatsapp,
    FaYoutube,
} from 'react-icons/fa'
import {Input} from "@nextui-org/react";

export const FooterTop = () => {
    return (
        <div className='grid grid-cols-6 sm:grid-cols-12 gap-10 sm:text-left text-center'>
            <div className='col-span-6 lg:col-span-5 flex flex-col sm:items-start items-center'>
                <div className='flex flex-col gap-3 sm:items-start items-center'>
                    <ApplicationLogo className='max-w-[200px]'/>
                    <p>
                        Minzifa Travel — это сайт с турами по Узбекистану и Центральной Азии
                        от тревел-экспертов с 20 летним опытом работы.
                    </p>
                    <p>
                        Приветствуем вас тепло и радостно и приглашаем Вас в удивительные,
                        яркие и запоминающиеся путешествия по великому Шелковому пути.
                    </p>
                    <p>Хотите обсудить детально? свяжитесь с нами.</p>
                </div>
                <ul className='pt-5 flex flex-col gap-2 sm:items-start items-center'>
                    <li className='text-lg font-bold'>Наши контакты:</li>
                    <li>
                        <Link
                            className='text-black flex items-center gap-2'
                            href='tel:+79311073801'
                        >
                            <FaPhone className='text-[#37af24]'/>
                            +79311073801
                        </Link>
                    </li>
                    <li>
                        <Link className='flex text-black items-center gap-2' href='#!'>
                            <FaWhatsapp className='text-[#37af24]'/>
                            Whatsapp
                        </Link>
                    </li>
                    <li>
                        <Link className='flex text-black items-center gap-2' href='#!'>
                            <FaTelegram className='text-[#37af24]'/>
                            Telegram
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='flex text-black items-center gap-2'
                            href='mailto:booking@minzifatravel.com'
                        >
                            <FaEnvelope className='text-[#37af24]'/>
                            booking@minzifatravel.com
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='col-span-6 lg:col-span-3 flex flex-col gap-5'>
                <ul className='flex flex-col gap-1'>
                    <li className='pb-1 text-lg font-bold'>
                        <p href='#!'>О Minzifa Travel</p>
                    </li>
                    <li>
                        <Link className='text-black' href='/about.html'>
                            О нас
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/contacts.html'>
                            Наши контакты
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/review'>
                            Отзывы туристов
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/country'>
                            Туры по странам
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/tour'>
                            Туры по типу
                        </Link>
                    </li>
                </ul>
                <ul className='flex flex-col gap-1'>
                    <li className='pb-1 text-lg font-bold'>Полезная информация</li>
                    <li>
                        <Link className='text-black' href='/news'>
                            Последние новости
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/stati'>
                            Наш блог
                        </Link>
                    </li>
                    <li><Link href='/places'>Достопримечательности</Link></li>
                    <li>
                        <Link className='text-black' href='/booking-rules-tour.html'>
                            Правила Бронирования Туров
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/booking-rules-hotel.html'>
                            Правила Бронирования Гостиниц
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/booking-rules-condition.html'>
                            Условия бронирования экскурсий
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/loyalty-program.html'>
                            Программа лояльности
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/customs'>
                            Таможенные правила
                        </Link>
                    </li>
                    <li>
                        <Link className='text-black' href='/insurance'>
                            Страховка
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='col-span-6 lg:col-span-4'>
                <h2 className='text-lg font-bold pb-3'>
                    Новости и акции, только для своих:
                </h2>
                <form className='flex flex-col gap-3 sm:items-start items-center'>
                    <div className='flex'>
                        <Input
                            endContent={
                                <button
                                    className='bg-[#37AF24] text-white rounded-lg px-[15px] h-full hover:bg-[#1f7e10]'
                                    type='submit'
                                >
                                    Подписаться
                                </button>}/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox'/>
                        Согласен на обработку персональных данных
                    </div>
                </form>
                <h2 className='text-base font-bold py-2'>Мы принимаем к оплате:</h2>
                <div className='grid grid-cols-6 gap-2 items-center'>
                    <img
                        src='https://turi-uzbekistana.ru/images/payment%20logo.svg'
                        alt='visa'
                    />
                    <img
                        src='https://turi-uzbekistana.ru/images/payment%20logo2.svg'
                        alt='mastecard'
                    />
                    <img
                        src='https://turi-uzbekistana.ru/images/payment%20logo3.svg'
                        alt='payoneer'
                    />
                    <img
                        src='https://turi-uzbekistana.ru/images/payment%20logo4.svg'
                        alt='paypall'
                    />
                    <img
                        src='https://turi-uzbekistana.ru/images/payment%20logo5.svg'
                        alt='mir'
                    />
                    <img
                        src='https://turi-uzbekistana.ru/images/payment%20logo6.svg'
                        alt='korona'
                    />
                </div>
                <h2 className='text-base font-bold py-2'>Мы в социальных сетях:</h2>
                <div className='flex items-center gap-3 justify-center sm:justify-start'>
                    <Link href='#!'>
                        <FaVk className='w-[25px] text-black h-[25px] object-cover hover:text-[#4C75A3]'/>
                    </Link>
                    <Link href='#!'>
                        <FaOdnoklassniki className='w-[25px] text-black h-[25px] object-cover hover:text-[#F97400]'/>
                    </Link>
                    <Link href='#!'>
                        <FaPinterest className='w-[25px] text-black h-[25px] object-cover hover:text-[#E60023]'/>
                    </Link>
                    <Link href='#!'>
                        <FaYoutube className='w-[25px] text-black h-[25px] object-cover hover:text-[#FF0000]'/>
                    </Link>
                </div>
                <Link
                    className='text-black flex items-center sm:justify-start justify-center gap-1 font-semibold pt-3'
                    href='#!'
                >
                    <FaTelegram/> Наш официальный телеграм канал
                </Link>
                <p className='opacity-50 pt-3'>Все цены на туры указаны в USD $</p>
                <Link className='opacity-50 text-black' href='#!'>
                    Карта сайта
                </Link>
            </div>
        </div>
    )
}
