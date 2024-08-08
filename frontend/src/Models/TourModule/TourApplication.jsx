import {Container} from "@/Components";
import {useStoreWallet} from "@/Components/WalletTopMenu/useStoreWallet.js";

export const TourApplication = ({fn, data}) => {
    const {wallet} = useStoreWallet()
    const formattedPrice = (data?.price * wallet.exchange_rate).toLocaleString('ru-RU');
    return (
        <section>
            <Container>
                <div className="flex justify-between lg:gap-0 gap-5 flex-wrap items-center">
                    <h1 className="md:text-3xl font-medium text-2xl max-w-[600px]">
                        {data?.main_title}
                    </h1>
                    <div className="flex flex-wrap justify-end items-center gap-5 lg:w-auto w-full">
                        <div className="flex flex-col justify-end items-end">
                            <small className="text-[#555]">Цена: <s className='line-through'>$ {data?.oldPrice}</s></small>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-medium">
                                    от $ {data?.price}
                                </span>
                                <span className="text-[#555]">({formattedPrice} {wallet.symbol})</span>
                            </div>
                        </div>
                        <button
                            className="bg-[#F44336] hover:bg-[#E53935] duration-150 p-[10px] text-white min-w-[200px] rounded-full lg:w-auto w-full"
                            onClick={fn}
                        >
                            Оставить заявку
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};
