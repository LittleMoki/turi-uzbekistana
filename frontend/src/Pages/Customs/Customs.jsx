'use client'
import { ArticleCard, Container } from '@/Components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import {useQuery} from "@tanstack/react-query";
import {api} from "@/Api/api.js";

const Customs = () => {
	const imagePath = encodeURIComponent(
		'Screenshot from 2024-06-23 07-58-23.png'
	)
	const cards = [
		{
			img: imagePath,
			country: 'Узбекистан',
			date: '23 марта 2024',
			views: '3121',
			title:
				'Откройте для себя Узбекистан: 7-дневное приключение с Minzifa Travel',
			description:
				'Исследуйте красоту и культуру Узбекистана с нашим эксклюзивным 7-дневным туром. Узнайте цены и особенности путешествия от Minzifa Travel.',
		},
		{
			img: imagePath,
			country: 'Узбекистан',
			date: '23 марта 2024',
			views: '3121',
			title:
				'Откройте для себя Узбекистан: 7-дневное приключение с Minzifa Travel',
			description:
				'Исследуйте красоту и культуру Узбекистана с нашим эксклюзивным 7-дневным туром. Узнайте цены и особенности путешествия от Minzifa Travel.',
		},
	]
	const {data} = useQuery({
		queryKey: ['customsNews'],
		queryFn: () => api.get(`/news/customs/urlType`),
		select: data => data.data.data
	});
	const customs = data?.filter(el=>el.publick !== 0)
	return (
		<section className='py-8'>
			<Container>
				<ul className='flex gap-3 items-center'>
					<li>Главная</li>
					<li>
						<MdKeyboardArrowRight />
					</li>
					<li>Таможенные правила для туристов которые едут в Узбекистан</li>
				</ul>
				<h1 className='lg:text-3xl text-2xl py-3'>
					Таможенные правила для туристов которые едут в Узбекистан
				</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:gap-52 gap-10'>
					{customs?.map((el, i) => (
						<ArticleCard {...el} key={i} />
					))}
				</div>
			</Container>
		</section>
	)
}

export default Customs
