import { Container} from "@/Components";
import {Accordion, AccordionItem} from "@nextui-org/react";

export const TourRoute = ({data}) => {
    return (
        <section className="pt-16">
            <Container>
                <h3 className="md:text-2xl text-xl text-center pb-5">
                    Маршрут тура
                </h3>
                {data?.tourtoday.length > 0 && (
                    <Accordion variant="splitted">
                        {data?.tourtoday?.map((el,i) => (
                            <AccordionItem key={el.id} aria-label={el.name} title={`День: ${i + 1} ${el.name}`}>
                                <div dangerouslySetInnerHTML={{__html: el.body}}/>
                                <div className='flex gap-3 pt-3'>
                                    <div>{el.breakfast ? <small className='flex items-center gap-1'><i
                                        className="fa-solid fa-utensils"></i>Завтрак</small> : ''}</div>
                                    <div>{el.lunch ? <small className='flex items-center gap-1'><i
                                        className="fa-solid fa-utensils"></i>Обед</small> : ''}</div>
                                    <div>{el.dinner ? <small className='flex items-center gap-1'><i
                                        className="fa-solid fa-utensils"></i>Ужин</small> : ''}</div>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )
                }
            </Container>
        </section>
    )
        ;
};
