import { Container } from "@/Components";
import { Head } from "@inertiajs/react";

const Reviews = () => {
    return (
        <section>
            <Container>
                <Head title="Review" />
                <h1 className="text-center text-4xl py-6">Отзывы</h1>
                <p className="text-center max-w-[600px] mx-auto">
                    Все отзывы о поездках пишутся независимо путешественниками,
                    которые испытали продукт Minzifa Travel на собственном
                    опыте.
                </p>
            </Container>
        </section>
    );
};

export default Reviews;
