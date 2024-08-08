'use client'
import {SignIn} from '@/UI/SignIn'
import SignUp from '@/UI/SignUp'
import {WalletTopMenu} from '@/Components'
import Link from "next/link";
import Cookies from "js-cookie";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

export const TopMenu = () => {
    const userId = Number(Cookies.get("userId"));

    const {data} = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => api.get(`/users/${userId}`),
        select: data => data?.data?.data,
        enabled: userId > 0
    });
    return (<div className='w-full py-3 bg-[#F0FDF4] relative z-0 lg:z-[21]'>
        <div className='px-3 mx-auto'>
            <div className='flex w-full items-center justify-end gap-2'>
                {
                    data !== undefined ?
                        <Link href='/user'>
                            {data?.first_name} {data?.last_name}
                        </Link>
                        :
                        <>
                            <SignIn/>
                            <SignUp/>
                        </>}
                <WalletTopMenu/>
            </div>
        </div>
    </div>)
}
