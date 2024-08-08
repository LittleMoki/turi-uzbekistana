import { Container } from "@/Components"
import {
    FaClock,
    FaEnvelope,
    FaMapMarker,
    FaPhone,
    FaTelegram,
    FaUserCircle,
    FaWhatsapp,
} from "react-icons/fa"
const Contacts = () => {
    return (
        <section className="py-5">
            <Container>
                <h1 className="text-center text-3xl py-8">
                    Контакты. Номера телефонов, почта, адрес. Минзифа Тревел,
                    туры в Узбекистан
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="flex flex-col items-start">
                        <h3 className="text-2xl font-medium pb-3">
                            Контактные данные:
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-2">
                                <FaPhone className="text-[#15803D]" />
                                <a href="tel:+79311073801">+79311073801</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaWhatsapp className="text-[#15803D]" />
                                <a href="https://wa.me/998912444721">
                                    Whatsapp
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaTelegram className="text-[#15803D]" />
                                <a href="https://t.me/Minzifatravelru">
                                    Telegram
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-[#15803D]" />
                                <a href="mailto:booking@minzifatravel.com">
                                    booking@minzifatravel.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaClock className="text-[#15803D]" />
                                Часы работы онлайн-консультанта: 24/7
                            </li>
                            <li className="flex items-center gap-2">
                                <FaClock className="text-[#15803D]" />
                                Часы работы офиса: с 10:00 до 18:00 (Выходные
                                дни: воскресенье)
                            </li>
                            <li className="flex items-center gap-2">
                                <FaMapMarker className="text-[#15803D]" />
                                Адрес: ул. Эшони Пир 53, Бухара 200118,
                                Узбекистан. "Unique Travel" FE by Minzifa
                                Travel.
                            </li>
                        </ul>
                        <a
                            className="bg-[#198754] hover:bg-[#157347] flex items-center gap-3 text-white text-lg mt-8 py-2 px-3 rounded-lg"
                            href="#!"
                        >
                            <FaUserCircle className="text-white" /> Отправить
                            заявку на подбор тура
                        </a>
                        <h3 className="text-2xl font-medium pb-2 pt-8">
                            Team Partner Care:
                        </h3>
                        <p>
                            урагенты, школы или организации, пожалуйста,
                            обращайтесь к <strong>Team Partner Care</strong> по
                            Email:
                        </p>
                        <a
                            className="flex items-center gap-2"
                            href="mailto:travel@minzifatravel.com"
                        >
                            <FaEnvelope />
                            travel@minzifatravel.com
                        </a>
                        <h3 className="text-2xl font-medium pb-2 pt-4">
                            Программа Маркетинга:
                        </h3>
                        <p>
                            Пользователи, которые могут и заинтересованы в
                            продвижении <strong>"Turi-Uzbekistana.ru"</strong>{" "}
                            через их бизнес веб-сайт, пожалуйста, свяжитесь с
                        </p>
                        <a
                            className="flex items-center gap-2"
                            href="mailto:timur.alimov@minzifatravel.com"
                        >
                            <FaEnvelope />
                            timur.alimov@minzifatravel.com
                        </a>
                    </div>
                    <iframe
                        className="w-full h-[300px] lg:h-full"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d191.66281590125772!2d64.421234!3d39.770975!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5005955555554b%3A0x8c4dbb893ef0c4fb!2sMinzifa%20Travel!5e0!3m2!1sru!2sus!4v1711465074517!5m2!1sru!2sus"
                    ></iframe>
                </div>
            </Container>
        </section>
    );
};

export default Contacts;
