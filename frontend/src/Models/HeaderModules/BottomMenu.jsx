'use client'
import { MobileMenu } from '@/Components'
import { useStoreMenu } from '@/Components/MobileMenu/useStoreMenu'
import { ApplicationLogo } from '@/UI/ApplicationLogo'
import Link from 'next/link'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FaHeadset } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import { IoIosArrowDown, IoIosCall } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/Api/api.js'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import Drawer from '@/UI/Drawer'
import CustomDrawer from '@/UI/Drawer'

export const BottomMenu = () => {
	const { data: countryData } = useQuery({
		queryKey: ['menuCountry'],
		queryFn: () => api.get(`/country`),
		select: data => data.data.data,
	})
	const { data: tourTypeData } = useQuery({
		queryKey: ['menuTourType'],
		queryFn: () => api.get(`/tour_type`),
		select: data => data.data.data,
	})
	const { data: tours } = useQuery({
		queryKey: ['tourSearch'],
		queryFn: () => api.get(`/tour`),
		select: data => data.data.data,
	})

	const [search, setSearch] = useState('')
	const [country, setCountry] = useState(false)
	const [tour, setTour] = useState(false)

	const filteredTourTypes = tourTypeData?.filter(tourType =>
		countryData?.some(country => country.url === tourType.url)
	)

	const searchFilter = tours?.filter(tour =>
		tour.main_title.toLowerCase().includes(search.toLowerCase())
	)
	return (
		<div className='py-2 bg-white w-full px-3 shadow-md relative'>
			<div className='max-w-[100wh]'>
				<div className='px-2 mx-auto flex flex-wrap justify-between gap-5  items-center'>
					<div className='flex items-center gap-3 md:w-auto w-full justify-between'>
						<CustomDrawer filteredTourTypes={filteredTourTypes} countryData={countryData}/>
						<Link href='/' className='w-[180px]'>
							<ApplicationLogo />
						</Link>
						<FaHeadset className='lg:hidden block w-7 h-7' />
					</div>
					<ul className='lg:flex hidden items-center gap-10'>
						<li
							onMouseEnter={() => {
								setCountry(true)
								setTour(false)
							}}
						>
							<div className='flex cursor-pointer items-center gap-2'>
								Страны
								<IoIosArrowDown
									className={`${country ? 'rotate-180' : 'rotate-0'}`}
								/>
							</div>
							<div
								onMouseLeave={() => setCountry(false)}
								className={`absolute left-0 top-[100%]  bg-white w-full z-[-10] duration-500 ease-in-out ${
									country ? 'translate-y-0' : 'translate-y-[-300%]'
								}`}
							>
								<div className='max-w-[1200px] gap-3 grid grid-cols-5 mx-auto py-[20px]'>
									{countryData?.map(el => (
										<Link
											key={el.id}
											href={`/country/${el.url}`}
											className='border relative overflow-hidden rounded-2xl h-[150px] cursor-pointer'
										>
											<Image
												width={300}
												height={300}
												src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
												className='object-cover'
												alt={el.photo}
											/>
											<div className='absolute w-full duration-200 h-full top-0 left-0 flex bg-black/60 hover:bg-black/80 justify-center items-center'>
												<h2 className='text-white text-lg font-medium'>
													{el.name}
												</h2>
											</div>
										</Link>
									))}
									<Link className='flex items-end' href='/country'>
										Все страны
									</Link>
								</div>
							</div>
						</li>
						<li
							onMouseEnter={() => {
								setTour(true)
								setCountry(false)
							}}
						>
							<div className='flex cursor-pointer items-center gap-2'>
								Туры
								<IoIosArrowDown
									className={`${tour ? 'rotate-180' : 'rotate-0'}`}
								/>
							</div>
							<div
								onMouseLeave={() => setTour(false)}
								className={`absolute left-0 top-[100%] bg-white w-full z-[-1] duration-500 ease-in-out ${
									tour ? 'translate-y-0' : 'translate-y-[-200%]'
								}`}
							>
								<div className='max-w-[1200px] gap-3 grid grid-cols-5 mx-auto py-[20px]'>
									{filteredTourTypes?.map((el, i) => (
										<Link
											key={i}
											href={`/tour/${el.url}`}
											className='border relative overflow-hidden rounded-2xl h-[150px] cursor-pointer'
										>
											<Image
												src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
												className='object-cover'
												alt='menuTopImage'
												width={300}
												height={300}
											/>
											<div className='absolute w-full duration-200 h-full top-0 left-0 flex bg-black/60 hover:bg-black/80 justify-center items-center'>
												<h2 className='text-white text-lg'>{el.name}</h2>
											</div>
										</Link>
									))}
									<Link className='flex items-end' href='/tour'>
										Все туры
									</Link>
								</div>
							</div>
						</li>
						<li>
							<Link className='text-black' href='/review'>
								Отзыв
							</Link>
						</li>
						<li>
							<Link className='text-black' href='/about.html'>
								О нас
							</Link>
						</li>
						<li className='relative'>
							<label className='flex items-center bg-[#f8f9fa] rounded-lg'>
								<Input
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder='Найти путешествие'
									endContent={<IoSearchOutline />}
								/>
							</label>
							{search.length > 0 && searchFilter.length > 0 && (
								<div
									className={`bg-white px-1 py-2 absolute w-full max-h-[200px] z-10 transition-all top-[50px] rounded-md overflow-x-auto`}
								>
									{searchFilter.map(el => (
										<Link onClick={()=>setSearch('')} key={el.id} className='hover:underline' href={`/tour/${el.type.url}/${el.url}`}>
											{el.main_title}
										</Link>
									))}
								</div>
							)}
						</li>
					</ul>
					<div className='items-center gap-5 flex max-[480px]:hidden'>
						<Link
							className='flex items-center gapp-5 text-[#365314]'
							href='tel:+79311073801'
						>
							<IoIosCall />
							+79311073801
						</Link>
						<Link
							className='flex items-center gap-2 bg-[#37AF24] text-white px-[12px] py-[6px] rounded-xl hover:bg-[#1f7e10] transition-colors'
							href='https://wa.me/998912444721'
							target='_blank'
						>
							<FaWhatsapp />
							Whatsapp
						</Link>
						<Link
							className='border-[#15803D] border-2 px-[12px] py-[6px] rounded-xl text-[#365314] hover:bg-[#15803D] hover:text-white transition-colors'
							href='/create-my-trip.html'
						>
							Создай свой тур
						</Link>
					</div>
				</div>
				<MobileMenu />
			</div>
		</div>
	)
}
