'use client'
import {Container} from "@/Components";
import Image from "next/image";
import bg from '/public/create-trip-photo.jpg'
import Link from "next/link";
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useStoreWallet} from "@/Components/WalletTopMenu/useStoreWallet.js";
import {useParams} from "next/navigation";

export const TourBook = ({data}) => {

    const {tourType, tour} = useParams();

    let defaultDate = {
        start: today(getLocalTimeZone()), end: today(getLocalTimeZone()),
    };

    const formatDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const startDay = format(startDate, 'd', {locale: ru});
        const startMonth = format(startDate, 'MMM', {locale: ru});
        const endDay = format(endDate, 'd', {locale: ru});
        const endMonth = format(endDate, 'MMM', {locale: ru});

        // Проверка на совпадение месяцев
        const isSameMonth = startMonth === endMonth;

        return isSameMonth ? `${startDay} - ${endDay} ${startMonth}` : `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    }
    const {wallet} = useStoreWallet()
    const formattedPrice = (price) => (price * wallet.exchange_rate).toLocaleString('ru-RU')
    // const formattedPrice = (price * wallet.exchange_rate).toLocaleString('ru-RU');
    return (
        <section>
            <Container>
                <div className="pt-10 flex md:flex-row flex-col  w-full justify-between gap-10">
                    <Accordion variant="splitted">
                        {
                            data?.tour_day_price && data?.tour_day_price.map(el => <AccordionItem
                                key={el.id}
                                title={<h4
                                    className='text-end text-2xl font-bold'>{formatDateRange(el.date_start, el.date_end)}</h4>}
                                subtitle={Date.now(el.date_start) <= Date.now(defaultDate.start) && Date.now(el.date_end) >= Date.now(defaultDate.start) ?
                                    <p className='text-green-600 text-end'>Доступен</p> :
                                    <p className='text-red-600 text-end'>Недоступен</p>}
                                startContent={<h3 className='text-2xl font-bold'>{el.single_price}$</h3>}
                            >
                                <div className='flex gap-2 justify-between items-center flex-wrap'>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='text-2xl font-bold'>от $ {el.single_price}</h3>
                                            <h4 className='text-[#666] font-semibold'>({formattedPrice(el.single_price)} {wallet.symbol})</h4>
                                        </div>
                                        <small>Цена тура указана на 1 человека в двухместном номере</small>
                                    </div>
                                    <Link
                                        href={{
                                            pathname: `/tour/${tourType}/${tour}/book`,
                                            query: {url: data?.url, id: el.id}
                                        }}><Button
                                        className='bg-[#C12525] text-white font-semibold'>Забронировать тур</Button></Link>
                                </div>
                            </AccordionItem>)
                        }
                    </Accordion>
                    <div className="md:max-w-[30%] md:max-h-[600px] max-h-[300px] relative overflow-hidden rounded-xl">
                        <Image
                            src={bg}
                            quality={100}
                            alt={bg}
                            className="w-full h-full md:object-cover object-contain brightness-75"
                        />
                        <div className="absolute w-full top-0 left-0 p-[10px] text-white text-center">
                            <h2 className="text-xl py-5">
                                Маршрут не совсем подходит для вас?
                            </h2>
                            <p className="text-sm pb-[10px]">
                                Нажмите на кнопку ниже и оставьте заявку. Мы
                                создадим индивидуальный тур для вас!
                            </p>
                            <Link href='/create-my-trip.html'>
                                <button
                                    className="bg-[#F44336] hover:bg-[#E53935] duration-150 p-[10px] w-full text-white rounded-full font-medium truncate">
                                    Создать индивидуальный тур
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
