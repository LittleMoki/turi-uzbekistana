import { Container } from '@/Components'
import Image from 'next/image'

const BookingRulesHotel = () => {
	const imagePath = encodeURIComponent(
		'Screenshot from 2024-06-23 07-58-23.png'
	)
	return (
		<section className='py-10'>
			<Container>
				<h1 className='md:text-3xl text-2xl font-medium text-center pb-10'>
					Условия и правила бронирования гостиниц
				</h1>
				<div className='overflow-hidden rounded-xl'>
					<Image
						className='w-full h-full object-cover'
						src={`http://localhost:4000/uploads/${imagePath}`}
						alt={imagePath}
						loading='lazy'
						width='100'
						height='100'
					/>
				</div>
				<h3 className='md:text-2xl text-xl font-medium py-3'>
					Условия Бронирование отелей
				</h3>
				<p>
					Бронирование отелей основано через официальный запрос туристического
					агенства Minzifa Travel. Заполненные формы бронирования требуются для
					подтверждения брони. Информация о каждом клиенте должна быть
					предоставлена в течение 72 часов до начала процесса. Minzifa Travelне
					несет ответственность за возможные неудобства в результате
					несвоевременной подачи информации.
				</p>
				<p className='pt-3'>
					20% от стоимости забронированного номера должны быть оплачены в момент
					подтверждения брони. Баланс стоимости гостиничного номера требуется
					оплатить по крайней мере за 3 дня до заезда, если Вы забронировали в
					течение 3 дней до заезда требуется полная оплата. Пожалуйста, обратите
					внимание, что Minzifa Travel оставляет за собой право в одностороннем
					порядке отклонить заявку без объяснения причин и вернуть депозит.
				</p>
				<h3 className='md:text-2xl text-xl font-medium py-3'>
					Большинство отелей
				</h3>
				<p>
					<strong>Время заезда с 14.00 вечера. Minzifa Travel</strong> не может
					гарантировать, что номера будут доступны до этого времени. В случае
					раннего заезда требуется предварительное бронирование. В случае не
					получения информации о предварительном бронировании,
					<strong>Minzifa Travel</strong> не может гарантировать готовность
					номеров.
				</p>
				<p className='py-3'>
					В случае раннего прибытия, с 07:00 утра-14:00 вечера, 50% от суточной
					стоимости номера взимается дополнительно.
				</p>
				<p>
					Регистрация заезда до 7:00 утра - 100% от суточной стоимости номера
					взимается дополнительно.
				</p>
				<p className='py-3'>
					Время выезда до 12:00 полудня. В случае позднего выезда до 18:00, 50%
					суточной стоимости номера взимается дополнительно. Выезд после 18:00
					100% от суточной стоимости номера взимается дополнительно.
				</p>
				<h3 className='md:text-2xl text-xl font-medium'>
					Отель Отмена Политики
				</h3>
				<p className='py-3'>
					В случае отказа Заказчика от заказанных услуг в срок менее 3 дней
					перед заездом в отель, Заказчик выплачивает MINZIFATRAVEL 50%
					стоимости от забронированного им гостиничного номера.
				</p>
				<p>
					Для групп: Общее колличество номеров могут быть отменены без штрафных
					санкций за 21 день до даты заезда. От 21 дня до 4 дней до прибытия 10%
					номеров могут быть отменены без штрафных санкций.
				</p>
				<p className='py-3'>
					За отмену или неявку клиент платит 100% стоимости забронированного
					номера, указанного в контракте временных рамок. Если гость прибывает
					позже в рамках программы он оплачивает за ту ночь, которую пропустил.
				</p>
				<h3 className='font-medium md:text-2xl text-xl'>Обязательства</h3>
				<p className='py-2'>
					Заказчик в случае обнаружения недостатков в предоставлении услуг, чем
					описано в предложении отеля, имеет право требовать их устранения
					бесплатно.
				</p>
				<p>
					Клиент должен соблюдать все правила внутри гостиницы. В случае
					повреждения имущества отеля Заказчиком, или приглашения посторонних
					гостей в отель, сотрудники отеля, гости, проживающие в этом отеле
					берут на себя ответственность в соответствии с законодательством в
					прибывающей стране.
				</p>
				<p className='pt-2'>
					<strong>Minzifa Travel</strong> имеет контракты с отелями, чтобы
					помочь в размещении и бронированию в отелях Узбекистана, и действует в
					качестве агента для третьих сторон. Minzifa
				</p>
				<p>
					<strong>Travel</strong> не несет ответственности за действия и
					бездействие этих третьих сторон.
				</p>
			</Container>
		</section>
	)
}

export default BookingRulesHotel