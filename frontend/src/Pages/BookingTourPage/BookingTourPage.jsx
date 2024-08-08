"use client";
import React, {useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import countries from 'i18n-iso-countries';
import {api} from "@/Api/api.js";
import Cookies from "js-cookie";
import {Container} from "@/Components/index.js";
import CustomInput from "@/UI/CustomInput.jsx";
import {Radio, RadioGroup, Select, SelectItem, Spinner} from "@nextui-org/react";

countries.registerLocale(require('i18n-iso-countries/langs/ru.json'));

// Получение списка стран на русском
const countryNames = countries.getNames('ru');
const countryOptions = Object.values(countryNames);

const BookingTourPage = () => {
    const router = useRouter()
    const [people, setPeople] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [tourType, setTourType] = useState('');
    const [singleRoom, setSingleRoom] = useState(0);

    const searchParams = useSearchParams();
    const url = searchParams.get('url');
    const id = searchParams.get('id');
    const userId = Cookies.get('userId');

    const {data: dataTour, isLoading, isError} = useQuery({
        queryKey: ['tourBookingData', url],
        queryFn: () => api.get(`/tour/${url}/url`),
        select: data => data.data.data
    });


    const {data: userData, isLoading: userLoading} = useQuery({
        queryKey: ['bookingUserData', userId],
        queryFn: () => api.get(`/users/${userId}`),
        select: data => data.data.data
    });
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        {id: 1, name: 'Ваши детали'},
        {id: 2, name: 'Дополнения к туру'},
        {id: 3, name: 'Оплата'},
    ];

    const next = () => {
        if (currentStep < steps.length) {
            setCurrentStep(step => step + 1);
        }
    };

    const prev = () => {
        if (currentStep > 1) {
            setCurrentStep(step => step - 1);
        }
    };
    const filteredTourDayPrice = dataTour?.tour_day_price.filter(el => el.id === Number(id))[0]

    const filterTourDayPriceById = dataTour?.tour_day_price?.find(el => el.id === Number(id));

    const decreasePeople = () => {
        if (people > 1) {
            setPeople(people => people - 1);
        }
    };

    const increasePeople = () => {
        setPeople(people => people + 1);
    };

    const formatedDate = (dateFormat) => {
        const date = new Date(dateFormat);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const singleRoomPrice = singleRoom * dataTour?.single_price

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await api.post('/orders', {
            user_id: parseInt(userId),
            travellers_count: people,
            tour_date_start: filterTourDayPriceById?.date_start,
            tour_date_end: filterTourDayPriceById?.date_end,
            order_created: new Date(),
            order_updated: new Date(),
            price: dataTour?.price || dataTour?.price,
            deposit: 0,  // Замените на реальные данные если они есть
            // balance: dataTour?.price * people + singleRoomPrice || dataTour?.price,
            balance: dataTour?.price > 0 ? dataTour?.price + singleRoomPrice : filteredTourDayPrice?.single_price + singleRoomPrice,
            total_price: dataTour?.price > 0 ? dataTour?.price + people : filteredTourDayPrice?.single_price * people,
            total_paid_price: 0,  // Замените на реальные данные если они есть
            payment_type: paymentType || '',
            tour_type: tourType || '',
        });


        if (response.status === 200) {
            // Обработка успешного ответа
            router.push('/')
        } else {
            // Обработка ошибки
            alert('Произошла ошибка при создании заказа.');
        }
    };

    const decreaseSingleRoom = () => {
        if (singleRoom > 0) {
            setSingleRoom(singleRoom => singleRoom - 1);
        }
    };

    const increaseSingleRoom = () => {
        setSingleRoom(singleRoom => singleRoom + 1);
    };


    return (
        <section>
            <Container>
                <div className='grid grid-cols-6 gap-4 py-5'>
                    {steps.map(el => (
                        <div className='flex flex-col gap-2 justify-center items-center sm:col-span-2 col-span-6'
                             key={el.id}>
                            <div
                                className={`w-[45px] h-[45px] ${el.id === currentStep ? 'bg-[#35AB23]' : 'bg-[#cdcbcb]'} flex justify-center items-center rounded-full text-2xl font-semibold text-white`}>
                                {el.id}
                            </div>
                            <div>{el.name}</div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className='pb-5'>
                    <div className='grid items-baseline lg:grid-cols-3 gap-4'>
                        <div className='p-5 rounded-xl  lg:col-span-2 bg-white'>
                            {currentStep === 1 && (
                                <div>
                                    <div className='flex flex-col items-start pb-5'>
                                        <p className='font-semibold'>Сколько вас? </p>
                                        <small>Укажите кол-во человек в группе</small>
                                        <div className='flex'>
                                            <button
                                                type='button'
                                                onClick={() => decreasePeople()}
                                                className='w-[45px] text-xl'
                                            >
                                                <i className='fa fa-minus'/>
                                            </button>
                                            <input
                                                type='number'
                                                value={people}
                                                min='1'
                                                readOnly
                                                className='border-0 w-[100px] text-center text-xl p-0 py-2'
                                            />
                                            <button
                                                type='button'
                                                onClick={() => increasePeople()}
                                                className='w-[45px] text-xl'
                                            >
                                                <i className='fa fa-plus'/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h3 className='text-xl font-semibold'>Информация о путешественниках</h3>
                                        <p><i className='fas fa-user'/> Основной путешественник</p>
                                        {userLoading ?
                                            <div className='w-full h-[30vh] flex justify-center items-center'>
                                                <Spinner label='Loading...' size="lg"/>
                                            </div>
                                            :
                                            <div className='flex flex-col gap-3'>
                                                <CustomInput label='Имя: *' value={userData?.first_name}/>
                                                <CustomInput label='Email: *' value={userData?.email}/>
                                                <CustomInput label='Номер телефона: *' value={userData?.phone_number}/>
                                                <Select
                                                    label='Страна:'
                                                    onChange={(e) => setTourType(e.target.value)}
                                                >
                                                    {countryOptions.map((country, index) => (
                                                        <SelectItem key={index} value={country}>
                                                            {country}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )}
                            {
                                currentStep === 2 && (
                                    <div>
                                        <h2 className=' py-1 text-xl'> Дополнительные услуги</h2>
                                        <p className=' py-1 text-xs'>Выберите дополнительные услуги</p>
                                        <h2 className=' py-1 text-xl'>Тип размешения</h2>
                                        {
                                            dataTour?.single_price && (
                                                <div>
                                                    Одноместное размещение + $ {dataTour?.single_price} на человека
                                                    <button
                                                        type='button'
                                                        onClick={() => decreaseSingleRoom()}
                                                        className='w-[45px] text-xl'
                                                    >
                                                        <i className='fa fa-minus'/>
                                                    </button>
                                                    <input
                                                        type='number'
                                                        value={singleRoom}
                                                        min='1'
                                                        readOnly
                                                        className='border-0 w-[100px] text-center text-xl p-0 py-2'
                                                    />
                                                    <button
                                                        type='button'
                                                        onClick={() => increaseSingleRoom()}
                                                        className='w-[45px] text-xl'
                                                    >
                                                        <i className='fa fa-plus'/>
                                                    </button>
                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            }
                            {
                                currentStep === 3 && (
                                    <div>
                                        <h2 className=' py-1 text-xl'>
                                            Способ оплаты
                                        </h2>
                                        <p className=' py-1 text-xs'> Выберите удобный для вас метод оплаты</p>

                                        <RadioGroup
                                            onValueChange={setPaymentType}
                                            value={paymentType}
                                            className='py-3'>
                                            <Radio value='Банковский перевод'>
                                                Банковский перевод
                                            </Radio>
                                            <Radio value='Оплата другим способом (Денежный перевод)'>
                                                Оплата другим способом (Денежный перевод)
                                            </Radio>
                                            <Radio value='Онлайн оплата'>
                                                Онлайн оплата
                                            </Radio>
                                        </RadioGroup>
                                    </div>
                                )
                            }
                            <div className='flex gap-2'>
                                <button type='button' onClick={() => prev()}
                                        className={`${currentStep === 1 ? 'hidden' : 'block'} mt-4 w-full p-2 bg-green-500 text-white rounded`}>Назад
                                </button>
                                <button type='button' onClick={() => next()}
                                        className={`${currentStep === 3 ? 'hidden' : 'block'} mt-4 w-full p-2 bg-green-500 text-white rounded`}>Далее
                                </button>
                                <button type='submit'
                                        className={`${currentStep === 1 || currentStep === 2 ? 'hidden' : 'block'} mt-4 w-full p-2 bg-green-500 text-white rounded`}>Забронировать
                                </button>
                            </div>
                        </div>
                        <div className='p-5 flex flex-col justify-between rounded-xl col-span-1 bg-white'>
                            <div>
                                <h2 className='font-semibold text-2xl'><i className='fas fa-suitcase'/> Информация о
                                    туре</h2>

                                <div className='grid lg:grid-cols-2 px-[20px] py-[10px]'>
                                    <p className='font-semibold'>Название тура:</p>
                                    <small className='text-end font-semibold text-base'>
                                        {dataTour?.name}
                                    </small>
                                </div>
                                <div className='grid lg:grid-cols-2 px-[20px] py-[10px]'>
                                    <p className='font-semibold'>Кол-во дней:</p>
                                    <small className='text-end font-semibold text-base'>
                                        {dataTour?.tourtoday?.length}
                                    </small>
                                </div>
                                <div className='grid lg:grid-cols-2 px-[20px] py-[10px]'>
                                    <p className='font-semibold'>Начало тура:</p>
                                    <small className='text-end font-semibold text-base'>
                                        {filterTourDayPriceById?.date_start ? formatedDate(filterTourDayPriceById?.date_start) : 'Не указана'}
                                    </small>
                                </div>
                                <div className='grid lg:grid-cols-2 px-[20px] py-[10px]'>
                                    <p className='font-semibold'>Конец тура:</p>
                                    <small className='text-end font-semibold text-base'>
                                        {filterTourDayPriceById?.date_end ? formatedDate(filterTourDayPriceById.date_end) : 'Не указана'}
                                    </small>
                                </div>
                                <h2 className='font-semibold text-2xl'><i className='fas fa-user'/> Путешественники</h2>
                                <div className='grid lg:grid-cols-2 px-[20px] py-[10px]'>
                                    <p className='font-semibold'>Кол-во чел.:</p>
                                    <small className='text-end font-semibold text-base'>
                                        {people}
                                    </small>
                                </div>
                                <div className='grid lg:grid-cols-2 px-[20px] py-[10px]'>
                                    <p className='font-semibold'>Цена тура на 1 чел.:</p>
                                    <small className='text-end font-semibold text-base'>
                                        ${dataTour?.price > 0 ? dataTour?.price : filteredTourDayPrice?.single_price}
                                    </small>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <h3 className='font-semibold text-2xl'>Итого:</h3>
                                <h3 className='text-end font-semibold text-xl'>
                                    ${dataTour?.price > 0 ? dataTour?.price * people + singleRoomPrice : filteredTourDayPrice?.single_price * people}
                                </h3>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default BookingTourPage;
