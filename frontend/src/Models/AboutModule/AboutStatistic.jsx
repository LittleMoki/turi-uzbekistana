import { Container } from '@/Components'

import icon1 from '/public/icons/1.svg'
import icon2 from '/public/luggage.svg'
import icon3 from '/public/tripadvisorSertificate.svg'
import icon4 from '/public/tourist.svg'
import Image from "next/image";

export const AboutStatistic = () => {
	const AboutCards = [
		{
			img: icon1,
			title: 'Опыт с 2011',
			descrition: 'создаем незабываемые путешествия.',
		},
		{
			img: icon2,
			title: '1010+',
			descrition: 'организованных туров',
		},
		{
			img: icon3,
			title: '360+',
			descrition: 'отзывов на tripadvisor.com',
		},
		{
			img: icon4,
			title: 'Опыт с 2011',
			descrition: 'довольных туристов',
		},
	]
	return (
		<Container>
			<section className='flex justify-center'>
				<div className='bg-white max-w-[800px] rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 items-start justify-center py-5 my-5'>
                    {AboutCards.map((el, i) => (
                        <div key={i} className='flex flex-col items-center text-center gap-1'>
                            <Image
                                className='object-contain w-[170px] h-[100px] pb-3'
                                src={el.img}
                                alt='aboutIcon'
                            />
                            <p>{el.title}</p>
                            <small>{el.descrition}</small>
                        </div>
                    ))}
                </div>
			</section>
		</Container>
	)
}
