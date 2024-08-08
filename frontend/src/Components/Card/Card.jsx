import {
    FaCalendarAlt,
    FaShieldAlt,
    FaCompass,
    FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import {useStoreWallet} from "@/Components/WalletTopMenu/useStoreWallet.js";
import Link from "next/link";

export const Card = ({
                         sales,
                         main_title,
                         photo,
                         guaranted,
                         type,
                         oldprice,
                         price,
                         tourtoday,
                         tour_city,
                         url,
                         tour_country
                     }) => {
    const country = tour_country?.map((el) => el.country?.name)
    const {wallet} = useStoreWallet()
    const formattedPrice = (price * wallet.exchange_rate).toLocaleString('ru-RU');
    // console.log(photo)
    return (
        <div className="relative bg-white rounded-2xl overflow-hidden  shadow-lg">
            <Link className="flex flex-col justify-between" href={`/tour/${type?.url}/${url}`}>
                {/*{discount && (*/}
                {/*    <div className="bg-[#dc3545] text-white text-xs font-bold absolute left-0 top-[15px] py-[3px] px-[6px] z-10 rounded-r-2xl">*/}
                {/*        - {discount} %*/}
                {/*    </div>*/}
                {/*)}*/}
                {sales && (
                    <div
                        className="absolute top-[15px] right-0 bg-[#ffeb3b] text-black rounded-l-2xl z-10 text-xs p-[5px] ">
                        {sales}
                    </div>
                )}
                <div className="relative rounded-2xl overflow-hidden">
                    <h2 className="absolute w-full left-0 bottom-0 text-white px-[10px] pt-[10px] pb-[20px] text-base font-extrabold reconmended_text">
                        {main_title}
                    </h2>
                    <Image
                        width={1000}
                        height={1000}
                        className="object-cover aspect-[4/3]"
                        src={`https://api.turi-uzbekistana.ru/uploads/${photo}`}
                        alt="card_img"
                    />
                </div>
                <div
                    className={`grid ${guaranted ? 'grid-cols-2' : 'grid-cols-1'} items-center relative bottom-[14px] px-2 gap-2`}>
                    {guaranted !== 0 && (
                        <div
                            className="text-white bg-[#37af24] flex items-center justify-center gap-1 rounded-2xl text-xs font-bold py-[3px] px-[10px]">
                            <FaShieldAlt className="min-w-[20px]"/>
                            <p className="truncate">Тур гарантирован!</p>
                        </div>
                    )}
                    <div
                        className="bg-[#dcfce7] flex items-center justify-center gap-1 rounded-2xl text-xs font-bold py-[3px] px-[10px]  ">
                        <FaCompass className="min-w-[20px]"/>
                        <p className="truncate">{type?.name}</p>
                    </div>
                </div>
                <div className="p-[10px] text-sm font-bold">{country}</div>
                <div className="flex text-sm text-[#666] p-[10px] gap-[10px]">
                    <div className="flex items-center gap-1">
                        <FaCalendarAlt/> {tourtoday?.length} дней
                    </div>
                    <div className="flex items-center gap-1">
                        <FaMapMarkerAlt/> {tour_city?.length } города
                    </div>
                </div>
                <div className="flex flex-col bottom-0 right-0 text-right text-2xl p-[10px] font-semibold absolute">
                    <s className="font-normal text-sm text-[#212529bf]">
                        от ${oldprice}
                    </s>
                    от ${price}
                    <span className="text-[#666] text-base font-semibold">
                        ({formattedPrice} {wallet?.symbol})
                    </span>
                </div>
            </Link>
        </div>
    );
};
