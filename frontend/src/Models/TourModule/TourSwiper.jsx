import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs} from "swiper/modules";
import {useState} from "react";
import Image from "next/image";

export const TourSwiper = ({image, data}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className='lg:max-w-[60%] max-w-full'>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="max-h-[400px] mb-3 rounded-xl"
            >
                {data?.photo && (
                    <SwiperSlide>
                        <Image
                            width={1000}
                            height={1000}
                            quality={100}
                            src={`https://api.turi-uzbekistana.ru/uploads/${data?.photo}`}
                            alt={data?.photo}
                        />
                    </SwiperSlide>
                )}
                {data?.tourphoto?.map((el, i) => (
                    <SwiperSlide key={i}>
                        <Image
                            width={1000}
                            height={1000}
                            quality={100}
                            src={`https://api.turi-uzbekistana.ru/uploads/${el?.photo}`}
                            alt={el?.photo}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {data?.tourphoto.length > 0 && (
                    <SwiperSlide>
                        <Image
                            width={1000}
                            height={1000}
                            quality={100}
                            src={`https://api.turi-uzbekistana.ru/uploads/${data?.photo}`}
                            alt={data?.photo}
                        />
                    </SwiperSlide>
                )}
                {data?.tourphoto?.map((el, i) => (
                    <SwiperSlide key={i}>
                        <Image
                            width={1000}
                            height={1000}
                            quality={100}
                            src={`https://api.turi-uzbekistana.ru/uploads/${el?.photo}`}
                            alt={el?.photo}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
