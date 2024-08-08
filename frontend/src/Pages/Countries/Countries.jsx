'use client'
import { BreadcrumbsComp, Container } from '@/Components'
import Link from 'next/link'
import { useState } from 'react'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import Image from "next/image";

const Countries = () => {
	const {data, isLoading, error} = useQuery({
		queryKey: ['countries'],
		queryFn: () => api.get(`/country`),
		select: data => data.data.data
	});
	const [activeCard, setActiveCard] = useState(null)

	const handleMouseEnter = index => {
		setActiveCard(index)
	}

	const handleMouseLeave = () => {
		setActiveCard(null)
	}
	const breadcrumbs = [
		<Link href='/' key='1'>
			Гланая
		</Link>,
		<Link href='/' key='2'>
			Страны
		</Link>,
	]
	return (
		<section className='py-5'>
			<Container>
				<BreadcrumbsComp breadcrumb={breadcrumbs} />
				<h1 className='text-3xl'>Страны</h1>
				<div className='grid max-[420px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-5 gap-4'>
					{data?.map(el=> (
						<div
							onMouseEnter={() => handleMouseEnter(el.id)}
							onMouseLeave={handleMouseLeave}
							key={el.id}
							className='relative overflow-hidden rounded-2xl cursor-pointer'
						>
							<Image width={300} height={300} src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`} alt='uzbekistan'/>
							<div
								className={`absolute w-full h-full top-0 left-0 flex justify-center items-center text-white bg-black/40 duration-200 ${
									activeCard === el.id ? 'opacity-0' : 'opacity-1'
								}`}
							>
								<h2 className='text-2xl'>{el.name}</h2>
							</div>
							<div
								className={`absolute w-full h-full top-0 left-0 flex justify-center items-center text-white bg-black/40 duration-200 ${
									activeCard === el.id ? 'opacity-1' : 'opacity-0'
								}`}
							>
								<Link
									className='border border-white py-3 px-12 rounded-xl text-xl hover:bg-white/30'
									href={`/country/${el.url}`}
								>
									Все города
								</Link>
							</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}

export default Countries
