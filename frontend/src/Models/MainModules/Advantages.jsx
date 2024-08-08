import { Container } from '@/Components'
import icon1 from '/public/icons/1.svg'
import icon2 from '/public/icons/2.svg'
import icon3 from '/public/icons/3.svg'
import Image from "next/image";
export const Advantages = () => {
	return (
		<section className='bg-white'>
			<Container>
				<div className=' justify-items-center grid lg:grid-cols-3 grid-cols-1'>
					<div className='flex flex-col items-center px-3 text-center gap-3 my-12 max-w-[440px]'>
						<Image src={icon1} alt={icon1}/>
						<h2 className='text-2xl '>Опыт с 2011</h2>
						<p className='text-sm'>
							С 2011 года создаем незабываемые путешествия. Качество, знания и
							страсть!
						</p>
					</div>
					<div className='flex flex-col items-center px-3 text-center gap-3 my-12 max-w-[440px]'>
						<Image src={icon2} alt={icon2}/>
						<h2 className='text-2xl '>3000+ Довольных Гостей</h2>
						<p className='text-sm'>
							Более 3000 путешественников выбрали нас за наше гостеприимство и
							надежность.
						</p>
					</div>
					<div className='flex flex-col items-center px-3 text-center gap-3 my-12 max-w-[440px]'>
						<Image src={icon3} alt={icon3}/>
						<h2 className='text-2xl '>Ваше признание – наша гордость</h2>
						<p className='text-sm'>
							350+ отзывов на TripAdvisor, победители 'Travellers Choice'
							2018-2023 гг.
						</p>
					</div>
				</div>
			</Container>
		</section>
	)
}
