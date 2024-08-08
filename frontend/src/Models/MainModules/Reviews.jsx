import { Container } from '@/Components'

import 'swiper/css'
import 'swiper/css/navigation'

export const Reviews = () => {
	return (
		<section className='py-10'>
			<Container>
				<h1 className='text-2xl font-medium text-center pb-4'>
					Отзывы наших туристов
				</h1>

				<div className='flex justify-center pt-5 flex-wrap gap-1'>
					<span>
						Общий рейтинг в <strong>Tripadvisor </strong>
					</span>
					<span>
						<strong> 5.0</strong> из 5
					</span>
					<span>
						на основании{' '}
						<strong className='underline'>
							<a target='_blank' href='#!'>
								367 отзывы
							</a>
						</strong>
					</span>
				</div>
			</Container>
		</section>
	)
}
