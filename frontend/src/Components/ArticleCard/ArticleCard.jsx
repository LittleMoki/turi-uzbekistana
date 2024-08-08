'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendarAlt, FaEye, FaGlobeAsia } from 'react-icons/fa'

export const ArticleCard = ({
	photo,
	country,
	new_date,
	view,
	url,
	type,
	firsttext,
	title,
	style = '',
}) => {
	return (
		<div className={`bg-white rounded-2xl shadow-lg ${style}`}>
			<div className='overflow-hidden relative rounded-2xl'>
				<Link href={`/${type?.url}/${url}`}>
					<Image
						className='object-cover aspect-[3/2]'
						src={`https://api.turi-uzbekistana.ru/uploads/${photo}`}
						alt='BookingRulesHotelBg'
						width='1000'
						height='1000'
					/>
				</Link>
				<div className='absolute bottom-0 left-0 w-full bg-black/70 text-white py-[5px] px-[15px] flex justify-between items-center flex-wrap gap-2'>
					<span className='flex items-center gap-2'>
						<FaGlobeAsia /> {country}
					</span>
					<span className='flex items-center gap-2'>
						<FaCalendarAlt /> {new_date}
					</span>
					<span className='flex items-center gap-2'>
						<FaEye />
						{view}
					</span>
				</div>
			</div>
			<h2 className='truncate p-2'>
				<a className='text-lg font-medium' href='#!'>
					{title}
				</a>
			</h2>
			<p className='p-2 text-sm font-medium'>
				<div dangerouslySetInnerHTML={{ __html: firsttext }} />
			</p>
		</div>
	)
}
