import { Container } from "@/Components";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

export const TourInclude = (props) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['services'],
        queryFn: () => api.get(`/services`),
        select: data => data.data.data
    });

    const include = data?.filter(service =>
        props?.data?.include.includes(service.id) && service.type_id === 1
    );


    const exclude = data?.filter(service =>
        props?.data?.exclude.includes(service.id) && service.type_id === 3
    );
    return (
        <section>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-10">
                    <div className="bg-white p-5 rounded-xl shadow-lg">
                        <h3 className="text-2xl pb-3 text-center font-medium">
                            Включено
                        </h3>
                        <ul className="flex flex-col gap-1">
                            {include?.map((el, i) => (
                                <div className='flex gap-2 items-center' key={i}>
                                    <li key={i} className={`${el.icon}`}/>
                                    {el.title}
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-lg">
                        <h3 className="text-2xl pb-3 font-medium text-center">
                            Дополнительно
                        </h3>
                        <ul className="flex flex-col gap-1">
                            {exclude?.map((el, i) => (
                                <div className='flex gap-2 items-center' key={i}>
                                    <li key={i} className={`${el.icon}`}/>
                                    {el.title}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
};
