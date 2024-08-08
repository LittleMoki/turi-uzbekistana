import { Container } from '@/Components'

export const AboutAddress = () => {
	return (
		<Container>
			<section className='flex justify-center'>
				<div className='bg-white w-full max-w-[800px] rounded-2xl p-[15px] flex flex-col items-center text-center gap-1'>
					<h3 className='text-2xl font-medium pb-2'>Наши реквизиты:</h3>
					<p>
						<strong>Юридическое название:</strong> “Unique Travel” FE by “Minzifa
						Travel”
					</p>
					<p>
						<strong>Лицензия: </strong>T-0087
					</p>
					<p>
						<strong>Сертификат: </strong>00 67 84.
					</p>
					<p>
						<strong>Головной офис:</strong> Республика Узбекистан, г. Бухара, ул.
						Эшони пир, 53
					</p>
					<p>
						<strong>Телефон: </strong>
						<a href='tel:+79311073801'>+79311073801</a>
					</p>
					<p>
						<strong>Е-mail:</strong>{' '}
						<a href='mailto:booking@minzifatravel.com'>
							booking@minzifatravel.com
						</a>
					</p>
					<p>
						<strong>Web: </strong>
						<a target='_blank' href='https://minzifatravel.com'>
							minzifatravel.com
						</a>
						<a target='_blank' href='https://turi-uzbekistana.ru'>
							; turi-uzbekistana.ru
						</a>
					</p>
				</div>
			</section>
		</Container>
	)
}
