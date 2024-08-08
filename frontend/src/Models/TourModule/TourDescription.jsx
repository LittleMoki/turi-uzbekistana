import { Container } from "@/Components";
import { MdOutlineCheck } from "react-icons/md";

export const TourDescription = ({data}) => {
    return (
        <section className="mx-auto">
            <Container>
                <div className="pt-5 max-[890px]:flex-col flex gap-10 lg:gap-20">
                    <div className="max-w-[800px] w-full">
                        <h3 className="sm:text-2xl text-xl text-center py-3">
                            Описание тура
                        </h3>
                        <div dangerouslySetInnerHTML={{__html: data?.body}}/>
                    </div>
                    <div className="bg-white shadow-xl p-5 rounded-2xl">
                        <h3 className="sm:text-2xl text-xl text-center sm:font-normal font-medium py-5">
                            Почему стоит путешествовать с Minzifa Travel
                        </h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <div className="flex items-center gap-1">
                                    <MdOutlineCheck className="text-[#15803D] w-5 h-5" />
                                    <h4 className="font-medium">
                                        Выбор туристов:
                                    </h4>
                                </div>
                                <p className="text-[#555] pl-[1.5rem]">
                                    4 награды Тravellers' сhoice от Тripadvisor
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-1">
                                    <MdOutlineCheck className="text-[#15803D] w-5 h-5" />
                                    <h4 className="font-medium">
                                        11 лет вместе
                                    </h4>
                                </div>
                                <p className="text-[#555] pl-[1.5rem]">
                                    Создаем комфортные путешествия
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-1">
                                    <MdOutlineCheck className="text-[#15803D] w-5 h-5" />
                                    <h4 className="font-medium">
                                        0 $ переплат
                                    </h4>
                                </div>
                                <p className="text-[#555] pl-[1.5rem]">
                                    Прямая цена без наценок агентств и
                                    партнерских комиссий
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-1">
                                    <MdOutlineCheck className="text-[#15803D] w-5 h-5" />
                                    <h4 className="font-medium">
                                        Свой человек в каждом городе
                                    </h4>
                                </div>
                                <p className="text-[#555] pl-[1.5rem]">
                                    Свой обученный персонал в каждом городе
                                    вашего путешествия
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-1">
                                    <MdOutlineCheck className="text-[#15803D] w-5 h-5" />
                                    <h4 className="font-medium">
                                        Выгодная система скидок и бонусов
                                    </h4>
                                </div>
                                <p className="text-[#555] pl-[1.5rem]">
                                    Программа лояльности, “для семьи”, “пригласи
                                    друга” и “снова с нами”. Сэкономьте до 10%
                                    на путешествиях.
                                </p>
                            </li>
                            <li>
                                <h4 className="font-medium">
                                    Выгодная система скидок и бонусов
                                </h4>
                                <p className="text-[#555] flex items-center gap-2">
                                    <MdOutlineCheck className="text-[#15803D] min-w-5 min-h-5" />
                                    Для бронирования места достаточно 30% от
                                    суммы
                                </p>
                                <p className="text-[#555] flex items-center gap-2">
                                    <MdOutlineCheck className="text-[#15803D] min-w-5 min-h-5" />
                                    Поддержка ответственного менеджера по туру
                                    24/7
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
};
