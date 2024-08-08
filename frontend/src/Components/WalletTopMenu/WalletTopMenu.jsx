"use client";
import {useStoreWallet} from "./useStoreWallet";
import {IoIosArrowDown} from "react-icons/io";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

export const WalletTopMenu = () => {
    const {wallet, setWallet} = useStoreWallet();
    const {data: walletData, isLoading, error} = useQuery({
        queryKey: ['wallet'],
        queryFn: () => api.get(`/exchange`),
        select: data => data.data.data,
    });

    const [isWallet, setIsWallet] = useState(null); // Изначально null
    const [icon, setIcon] = useState(false);

    // Используем useEffect для установки начального значения isWallet после загрузки данных
    useEffect(() => {
        if (walletData && walletData.length > 0) {
            // Устанавливаем первый элемент из массива по умолчанию
            const initialWallet = walletData.filter(el => el.primary_valuta === true).find(item => item.title); // замените 'someTitle' на ваше условие
            if (initialWallet) {
                setIsWallet(initialWallet);
                setWallet(
                    {
                        exchange_rate: initialWallet.exchange_rate,
                        symbol: initialWallet.symbol
                    }
                ); // Устанавливаем начальное значение wallet
            }
        }
    }, [walletData, setWallet]);

    if (error && wallet) {
        return <div>Error loading data</div>;
    }
    return (
        <Dropdown onOpenChange={e => setIcon(e)}>
            <DropdownTrigger>
                <Button
                    color='c'
                    endContent={<IoIosArrowDown className={icon ? "rotate-0" : "rotate-180"}/>}
                >
                    {isWallet ? isWallet.title : "Select Wallet"} {/* Отображаем title вместо объекта */}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic exchanges">
                {
                    walletData && walletData?.map(el => (
                        <DropdownItem
                            onClick={() => {
                                setWallet(
                                    {
                                        exchange_rate: el.exchange_rate,
                                        symbol: el.symbol
                                    }
                                );
                                setIsWallet(el);
                            }}
                            key={el.id}
                        >
                            {el.title}
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default WalletTopMenu;
