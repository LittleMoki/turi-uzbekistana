import { Container } from "@/Components";
import {
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaTelegram,
    FaWhatsapp,
} from "react-icons/fa";
export const TourOrganization = () => {
    return (
        <section>
            <Container>
                <h2 className="text-2xl text-center py-5">Тревел эксперт</h2>
                <div className='bg-white p-[40px] rounded-[15px] shadow-lg'>
                    <div className="flex md:flex-row flex-col w-full gap-10 justify-between">
                        <div className="overflow-hidden md:min-w-[300px] mx-auto max-w-[300px]">
                            <img
                                className="rounded-full"
                                src="https://turi-uzbekistana.ru/images/about/20211028160059.jpg"
                                alt="timur"
                            />
                        </div>
                        <div className="font-medium">
                            <h3 className="text-[#555]">Владелец компании</h3>
                            <h2 className="text-[#15803D] text-2xl">
                                Тимур Алимов
                            </h2>
                            <div className="italic pt-2 text-[#555] flex flex-col gap-4">
                                <p>
                                    Минзифа Трэвел, ваш профессиональный организатор
                                    путешествий по Центральной Азии и Ближнему
                                    Востоку.
                                </p>
                                <p>
                                    За последние 10 лет наша компания смогла
                                    выстроить высококачественную систему организации
                                    туров, что включает в себя более сотни
                                    поставщиков туруслуг с разных стран.
                                </p>
                                <p>
                                    Наша компания предлагает высокое качество услуг
                                    по оптимальной цене для наших клиентов. С нами
                                    не только комфортно путешествовать, но также
                                    интересно. Наши туры насыщены историей,
                                    культурой , архитектурой и природной красотой. У
                                    нас широкий выбор туров для вас по разной
                                    тематике.
                                </p>
                                <p>
                                    Каждый наш предлагаемый тур проходит проверку на
                                    качество услуг, на логистику и т.д. нашими
                                    специалистами, и доведя его до совершенства мы с
                                    удовольствием предоставляем его вам, нашим
                                    дорогим клиентам.
                                </p>
                                <p>
                                    Минзифа Трэвел - Ваш эксперт по путешествию в
                                    Азию.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col items-center w-full gap-10 pt-10">
                        <div className="max-w-[300px] w-full flex flex-col justify-between">
                            <h3 className="text-xl font-bold text-center">
                                Мои контакты
                            </h3>
                            <div className="flex items-center justify-center gap-[10px] pt-5 ">
                                <FaWhatsapp className="min-w-6 min-h-6 text-[#43d854]"/>
                                <FaTelegram className="min-w-6 min-h-6 text-[#0088cc] bg-white"/>
                                {/*<FaFacebookF className="min-w-6 min-h-6 text-[#3b5998] "/>*/}
                                {/*<FaInstagram className="min-w-6 min-h-6"/>*/}
                                <FaEnvelope className="min-w-6 min-h-6 text-[#c30303]"/>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium pb-2">
                                Как зарезервировать место
                            </h3>
                            <p className="text-[#555]">
                                Вы можете связаться со мной или с нашей командой,
                                любым удобным для вас способом, и мы обсудим и
                                договоримся о сроках подготовки и оплаты тура.
                            </p>
                        </div>
                    </div>
                    <p className="pt-5 text-[#555]">
                        В программе использованы фотографии из предыдущих наших
                        путешествий, снятые как мной, так и другими участниками.
                        Спасибо авторам и команде Минзифа Тревел
                    </p>
                </div>
            </Container>
        </section>
    );
};
