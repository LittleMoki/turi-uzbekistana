'use client'
import { useState } from 'react'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import { useStoreMenu } from './useStoreMenu'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'

export const MobileMenu = () => {
	const menuCards = [
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
		{
			img: 'https://turi-uzbekistana.ru/images/country/202206071054398710.jpg',
			title: 'Туры в Узбекистане',
		},
	]
	const [tour, setTour] = useState(false)

	const { menu, setMenu } = useStoreMenu()

	const [review, setReview] = useState(false)
	// menu
	// 	? document.body.classList.add('active')
	// 	: document.body.classList.remove('active')
	return (
		<div
			className={`w-full z-[25]  h-full lg:hidden block${
				menu ? 'opacity-1 visible' : 'opacity-0 invisible'
			}  fixed top-0 left-0 overlay`}
		>
			<nav
				className={`w-[75%] h-full bg-white transition ease-in-out duration-500 overflow-x-auto ${
					menu ? 'translate-x-0' : 'translate-x-[-100%]'
				}`}
			>
				<div className='flex justify-end p-2'>
					<IoClose
						onClick={() => setMenu(false)}
						className='w-7 h-7 cursor-pointer'
					/>
				</div>
				<ul className='flex flex-col pl'>
					<li className='py-3 px-5 border-b flex flex-col'>
						<div
							onClick={() => setReview(!review)}
							className='flex justify-between items-center cursor-pointer'
						>
							Страны
							<IoIosArrowDown />
						</div>
						<ul
							className={`pt-4 flex flex-col gap-3 ${
								review ? 'flex' : 'hidden'
							}`}
						>
							{menuCards.map((el, i) => (
								<li
									key={i}
									onClick={() => {
										setMenu(false)
										setReview(false)
										setTour(false)
									}}
									className='rounded-2xl w-full h-[150px]  overflow-hidden relative'
								>
									<Link href='/tour'>
										<img
											className='object-cover'
											src='https://turi-uzbekistana.ru/images/country/202206041954020456.jpg'
											alt='bg-img'
										/>
										<div
											className='absolute top-0 left-0
                                    w-full h-full flex justify-center items-center bg-black/50 text-white'
										>
											<h2 className='text-xl font-medium'>Туры Туркменистан</h2>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</li>

					<li className='py-3 px-5 border-b'>
						<div
							onClick={() => setTour(!tour)}
							className='flex cursor-pointer items-center justify-between'
						>
							Туры
							<IoIosArrowDown />
						</div>
						<ul
							className={`pt-4 flex flex-col gap-3 ${tour ? 'flex' : 'hidden'}`}
						>
							{menuCards.map((el, i) => (
								<li
									key={i}
									onClick={() => {
										setMenu(false)
										setReview(false)
										setTour(false)
									}}
									className='rounded-2xl w-full h-[150px]  overflow-hidden relative'
								>
									<Link href='/tour'>
										<img
											className='object-cover'
											src='https://turi-uzbekistana.ru/images/country/20220604120258347.jpg'
											alt='bg-img'
										/>
										<div
											className='absolute top-0 left-0
                                    w-full h-full flex justify-center items-center bg-black/50 text-white'
										>
											<h2 className='text-xl font-medium'>Туры Казахстана</h2>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</li>
					<li onClick={() => setMenu(false)} className='border-b py-3 pl-5'>
						<Link href='/review'>Отзывы</Link>
					</li>
					<li onClick={() => setMenu(false)} className='py-3 pl-5 border-b'>
						<Link href='/about.html'>О нас</Link>
					</li>
					<li>
						<label className='w-full flex items-center bg-slate-100'>
							<input
								className='w-full border-0 pl-5 bg-inherit'
								type='text'
								placeholder='Найти путешествие'
							/>
							<IoSearchOutline className='mx-3' />
						</label>
					</li>
				</ul>
			</nav>
		</div>
	)
}
