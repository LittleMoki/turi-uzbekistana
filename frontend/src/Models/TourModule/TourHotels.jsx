import {Container} from "@/Components";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import Image from "next/image";

const fetchData = async (ids) => {
    const promises = ids.map(id => api.get(`/hotel/${id}`));
    const responses = await Promise.all(promises);
    return responses.map(response => response);
}

export const TourHotels = ({hotelId}) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['hotels', hotelId],
        queryFn: () => fetchData(hotelId),
        select: data => data,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }
    const hotels = data?.map(el => el.data.data)
    return (
        <section className="pt-10">
            <Container>
                <h3 className="text-2xl text-center pb-4 font-medium">
                    Проживание
                </h3>
                <div className="flex gap-5 overflow-x-auto">
                    {
                        hotels?.length > 0 && hotels?.map(el => (
                            <div className="max-w-[400px] relative min-w-[300px]">
                                <div className="pb-3 overflow-hidden ">
                                    <Image
                                        width={500}
                                        height={500}
                                        className="object-cover w-full h-full rounded-2xl"
                                        src={`https://api.turi-uzbekistana.ru/uploads/${el?.photo}`}
                                        alt={el?.photo}
                                    />
                                </div>
                                <p className="font-medium absolute bottom-[25px] left-[10px] text-white text-lg">
                                    {el?.name}
                                </p>
                                {el?.booking_rating > 0 && (
                                    <div
                                        className='bg-[#003b95] w-[32px] h-[32px] flex justify-center items-center text-white absolute top-[15px] right-[15px] rounded-md'>
                                        {el?.booking_rating}
                                    </div>
                                )}
                                {el?.rating > 0 && (
                                    <div className='absolute left-[10px] bottom-[50px]'>
                                        {Array.from({length: el?.rating}, (_, index) => (
                                            <i key={index} className="fa fa-star" style={{color: 'gold'}}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            </Container>
        </section>
    );
};
