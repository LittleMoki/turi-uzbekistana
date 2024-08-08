import { ArticleCard, Container } from "@/Components";
import { Head } from "@inertiajs/react";
import {
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Articles = () => {
    const cards = [
        {
            img: "https://turi-uzbekistana.ru/images/news/202309251428152727.jpg",
            country: "Узбекистан",
            date: "23 марта 2024",
            views: "3121",
            title: "Откройте для себя Узбекистан: 7-дневное приключение с Minzifa Travel",
            description:
                "Исследуйте красоту и культуру Узбекистана с нашим эксклюзивным 7-дневным туром. Узнайте цены и особенности путешествия от Minzifa Travel.",
        },
        {
            img: "https://turi-uzbekistana.ru/images/news/202309251428152727.jpg",
            country: "Узбекистан",
            date: "23 марта 2024",
            views: "3121",
            title: "Откройте для себя Узбекистан: 7-дневное приключение с Minzifa Travel",
            description:
                "Исследуйте красоту и культуру Узбекистана с нашим эксклюзивным 7-дневным туром. Узнайте цены и особенности путешествия от Minzifa Travel.",
        },
        {
            img: "https://turi-uzbekistana.ru/images/news/202309251428152727.jpg",
            country: "Узбекистан",
            date: "23 марта 2024",
            views: "3121",
            title: "Откройте для себя Узбекистан: 7-дневное приключение с Minzifa Travel",
            description:
                "Исследуйте красоту и культуру Узбекистана с нашим эксклюзивным 7-дневным туром. Узнайте цены и особенности путешествия от Minzifa Travel.",
        },
    ];
    return (
        <section>
            <Container>
                <Head title="Articles" />
                <ul className="flex items-center gap-1 py-3">
                    <li>Главная</li>
                    <li>
                        <MdKeyboardArrowRight />
                    </li>
                    <li>
                        Новости о Узбекистане - события которые точно нельзя
                        пропустить
                    </li>
                </ul>
                <h1 className="pb-3 text-3xl ">
                    Новости о Узбекистане - события которые точно нельзя
                    пропустить
                </h1>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((el, i) => (
                        <ArticleCard {...el} key={i} />
                    ))}
                </div>
                <div className="flex justify-center pt-5 pb-10 ">
                    <div className="bg-white hover:bg-[#cf3] p-4 cursor-pointer flex items-center hover:rounded-md duration-150">
                        <MdKeyboardDoubleArrowLeft />
                    </div>
                    <div className="flex items-center ">
                        <span className="hover:bg-[#cf3] bg-white p-4 hover:rounded-md duration-150">
                            1
                        </span>
                        <span className="hover:bg-[#cf3] bg-white p-4 hover:rounded-md duration-150">
                            2
                        </span>
                        <span className="hover:bg-[#cf3] bg-white p-4 hover:rounded-md duration-150">
                            3
                        </span>
                        <span className="hover:bg-[#cf3] bg-white p-4 hover:rounded-md duration-150">
                            4
                        </span>
                    </div>
                    <div className="bg-white hover:bg-[#cf3] p-4 cursor-pointer flex items-center hover:rounded-md duration-150">
                        <MdKeyboardDoubleArrowRight />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Articles;
