import { Card, Container } from "@/Components";

export const TourPopular = ({ cards }) => {
    return (
        <section className="pt-10">
            <Container>
                <h3 className="text-2xl font-medium text-center">
                    Другие популярные туры
                </h3>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-5 gap-5">
                    {cards.map((el, i) => (
                        <Card {...el} key={i} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TourPopular;
