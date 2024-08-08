'use client'
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {Card, CardBody, Spinner, Tab, Tabs} from "@nextui-org/react";
import {Container} from "@/Components/index.js";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import UserOrdersPage from "@/Components/UserOrdersPage/UserOrdersPage.jsx";

const UserPage = () => {
    const router = useRouter();
    const userId = Cookies.get("userId");

    const {data, isLoading} = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => api.get(`/users/${userId}`),
        select: data => data?.data?.data
    });


    const logOut = () => {
        Cookies.remove("session")
        Cookies.remove("userId")
    }

    if (isLoading) {
        return <div className='w-full h-[30vh] flex justify-center items-center'><Spinner size="lg"/></div>
    }

    return (
        <Container>
            <div className='bg-white my-10 flex justify-between items-center py-3 px-2 rounded-xl'>
                <div className='flex items-center gap-3'>
                    <Image width={40} height={40} className='rounded-full bg-gray-700'
                           src={`http://localhost:4000/uploads/${data?.photo}`} alt={data?.photo}/>
                    <h2>{data?.first_name} {data?.last_name}</h2>
                </div>
                <a href='/' onClick={() => logOut()}>Выход</a>
            </div>
            <Tabs className='flex flex-wrap' aria-label="Options">
                <Tab key="Профиль" title="Профиль">
                    <Card>
                        <CardBody>
                            <div className='p-3'>
                                <h2 className='text-2xl pb-3'>Профиль</h2>
                                <p><strong>Id пользователя:</strong> {data?.id}</p>
                                <p><strong>Имя:</strong> {data?.first_name}</p>
                                <p><strong>Фамилия:</strong> {data?.last_name}</p>
                                <p><strong>Email:</strong> {data?.email}</p>
                                <p><strong>Телефон:</strong> {data?.phone_number}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Мои заказы" title="Мои заказы">
                    <Card>
                        <CardBody>
                            {
                                'You have not any orders' && data?.t_orders.map(el => (
                                    <UserOrdersPage key={el.id} {...el}/>
                                ))
                            }
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Мои отзывы" title="Мои отзывы">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidata?t non proident, sunt in culpa qui officia
                            deserunt
                            mollit
                            anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Настройки" title="Настройки">
                    <Card>
                        <CardBody>
                            <div className='p-3'>
                                <h2>Настройки</h2>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default UserPage;