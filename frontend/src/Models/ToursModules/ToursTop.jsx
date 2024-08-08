import {Container} from "@/Components";
import banner from '/public/banner.jpg'
import Link from "next/link";
import {useState} from "react";


export const ToursTop = ({tourType, tourTypeUrl, TourTypeBase, setFilterByDay}) => {

    const [selected, setSelected] = useState(3);

    const selectTourFilterDay = (id) => {
        if (id !== selected) {
            setSelected(id);
        }
    }

    return (
        <section
            style={{
                background: `url('${tourType === undefined ? banner.src : `http://localhost:4000/uploads/${tourTypeUrl?.photo}`}'), no-repeat`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: ' center center',
            }}
            className="bg-[#F0FDF4] py-3 flex items-center min-h-[400px] relative after:absolute z-[1] after:z-[-1] after:top-0 after:left-0 after:w-full after:bg-black/40 after:h-full">
            <Container>
                <h1 className='text-white font-bold sm:text-4xl text-2xl'>{tourTypeUrl?.name}</h1>
                <div
                    className='p-[15px] mt-[40px] mb-[20px] grid max-[500px]:grid-cols-1 grid-cols-3 bg-white/20 backdrop-blur-md rounded-md max-w-[500px]'>
                    <button
                        onClick={() => setFilterByDay(4) || selectTourFilterDay(1)}
                        className={`${selected === 1 ? 'bg-white text-black' : 'text-white'} border hover:bg-white hover:text-black transition grid max-[500px]:rounded-l-none rounded-l-lg p-[12px]`}>
                        Многодневные
                    </button>
                    <button
                        onClick={() => setFilterByDay(2) || selectTourFilterDay(2)}
                        className={`${selected === 2 ? 'bg-white text-black' : 'text-white'} border hover:bg-white hover:text-black transition  p-[12px]`}>
                        Короткие
                    </button>
                    <button
                        onClick={() => setFilterByDay(1) || selectTourFilterDay(3)}
                        className={`${selected === 3 ? 'bg-white text-black' : 'text-white'} border hover:bg-white hover:text-black transition max-[500px]:rounded-r-none rounded-r-lg p-[12px]`}>
                        Однодневные
                    </button>
                </div>
                {!tourType && <div className='flex flex-wrap items-center gap-[10px] w-full'>
                    {TourTypeBase?.map(el => (
                        <Link href={`/tour/${el.url}`}
                              className='border rounded-lg hover:bg-white hover:text-black transition text-white backdrop-blur-md bg-white/20 p-[5px] text-sm cursor-pointer'>
                            {el.name}
                        </Link>
                    ))}
                </div>
                }
            </Container>
        </section>
    );
};
