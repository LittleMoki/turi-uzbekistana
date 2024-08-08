'use client'
import { DatePicker, Switch } from '@nextui-org/react'
import { useState } from 'react'
import { FaEnvelope, FaGlobe, FaUser } from 'react-icons/fa'

export const TripForm = () => {
	const tripCard = [
		{ title: 'Премиум класс', id: 'accomodation-0' },
		{ title: 'Бизнес класс', id: 'accomodation-1' },
		{ title: 'Бутик отели', id: 'accomodation-2' },
		{ title: 'Бронирую сам', id: 'accomodation-3' },
	]
	const tripPeople = [
		{ title: 'Я один', id: 'solo' },
		{ title: 'Нас двое', id: 'couple' },
		{ title: 'Семья', id: 'family' },
		{ title: 'Группа', id: 'group' },
	]
	const [flexibleDates, setFlexibleDates] = useState(false)
	const [live, setLive] = useState(0)
	const [people, setPeople] = useState(0)
	const [hotel, setHotel] = useState(1)

	const setCheckLive = index => {
		setLive(index)
	}

	const setCheckPeople = index => {
		setPeople(index)
	}

	const decreaseHotel = () => {
		if (hotel > 1) {
			setHotel(hotel - 1)
		}
	}

	const increaseHotel = () => {
		setHotel(hotel + 1)
	}
	const handleChange = event => {
		setFlexibleDates(event.target.checked)
	}
	return (
		<form className='w-full flex flex-col gap-5'>
			<div className='bg-white/70 rounded-2xl p-4'>
				<h2 className='text-2xl border-l-4 border-[#66B93E] pl-2'>
					Какое ваше идеальное путешествие?
				</h2>
				<div className='pt-4'>
					<h3 className='text-xl'>Тип отеля</h3>
					<div className='grid max-[420px]:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-3 pt-2'>
						{tripCard.map((el, i) => (
							<div className='flex w-full' key={i}>
								<input
									type='radio'
									id={el.id}
									value={el.title}
									className='absolute opacity-0'
									name='проживание'
									aria-label={el.title}
								/>
								<label
									onClick={() => setCheckLive(i)}
									className={`p-3 text-center rounded-xl cursor-pointer w-full ${
										live === i ? 'bg-[#66B93E] text-white' : 'bg-white'
									}`}
									htmlFor={el.id}
								>
									{el.title}
								</label>
							</div>
						))}
					</div>
				</div>
				<div>
					<h3 className='text-xl pt-5 pb-1'>Тип отеля</h3>
					<div className='flex'>
						<button
							onClick={decreaseHotel}
							className='w-[45px] bg-[#dee2e6] text-xl'
							aria-label='Decrease hotel count'
						>
							-
						</button>
						<input
							type='number'
							value={hotel}
							min='1'
							readOnly
							className='border-0 w-[100px] text-center text-xl p-0 py-2'
							aria-label='Number of hotels'
						/>
						<button
							onClick={increaseHotel}
							className='w-[45px] bg-[#dee2e6] text-xl'
							aria-label='Increase hotel count'
						>
							+
						</button>
					</div>
				</div>
				<div>
					<h3 className='text-xl pt-5 pb-1'>Дата прибытия</h3>
					<div className='flex flex-col sm:flex-row sm:items-center sm:w-auto w-full items-start gap-3'>
						<DatePicker className='sm:w-[200px] w-full' />
						<Switch aria-label='Flexible dates?'>Гибкие даты?</Switch>
					</div>
				</div>
				<div>
					<h3 className='text-xl pt-5'>Направления</h3>
					<h3 className='text-xl pt-3 pb-1'>
						Чем вам могут помочь наши эксперты по путешествиям?
					</h3>
					<textarea
						className='w-full h-[150px] p-[10px] border-0 rounded-lg'
						placeholder='Укажите свои пожелания и предпочтения, чтобы мы смогли сделать Ваше путешествие особенным.'
						aria-label='Travel preferences'
					/>
				</div>
			</div>
			<div className='bg-white/70 rounded-2xl p-4'>
				<h3 className='text-2xl border-l-4 border-[#66B93E] pl-2'>
					Расскажите нам о себе
				</h3>
				<h3 className='text-xl pt-5'>Кто путешествует с Вами?</h3>
				<div className='grid max-[420px]:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-3 pt-2'>
					{tripPeople.map((el, i) => (
						<div key={i} className='w-full flex justify-center'>
							<input
								type='radio'
								id={el.id}
								value={el.title}
								className='absolute opacity-0'
								name='проживание'
								aria-label={el.title}
							/>
							<label
								onClick={() => setCheckPeople(i)}
								className={`w-full p-3 rounded-xl cursor-pointer text-center ${
									people === i ? 'bg-[#66B93E] text-white' : 'bg-white'
								}`}
								htmlFor={el.id}
							>
								{el.title}
							</label>
						</div>
					))}
				</div>
				<div>
					<div>
						<h3 className='text-xl pt-5 pb-2'>Ваша страна</h3>
						<div className='flex'>
							<div className='bg-[#f8f9fa] py-[6px] px-[12px] border-r-2 rounded-l-md'>
								<FaGlobe className='w-full h-full' />
							</div>
							<input
								type='text'
								className='w-full py-2 pl-2 border-0 rounded-r-md'
								placeholder='Ваша страна'
								aria-label='Your country'
							/>
						</div>
					</div>
					<div>
						<h3 className='text-xl pt-5 pb-2'>Ваше имя</h3>
						<div className='flex'>
							<div className='bg-[#f8f9fa] py-[6px] px-[12px] border-r-2 rounded-l-md'>
								<FaUser className='w-full h-full' />
							</div>
							<input
								type='text'
								className='w-full py-2 pl-2 border-0 rounded-r-md'
								placeholder='Ваше имя'
								aria-label='Your name'
							/>
						</div>
					</div>
					<div>
						<h3 className='text-xl pt-5 pb-2'>Email</h3>
						<div className='flex'>
							<div className='bg-[#f8f9fa] py-[6px] px-[12px] border-r-2 rounded-l-md'>
								<FaEnvelope className='w-full h-full' />
							</div>
							<input
								type='text'
								className='w-full py-2 pl-2 border-0 rounded-r-md'
								placeholder='Ваш email'
								aria-label='Your email'
							/>
						</div>
						<small className='opacity-70'>
							Пожалуйста, проверьте свой адрес электронной почты, чтобы мы могли
							с вами точно связаться.
						</small>
					</div>
				</div>
				<p className='text-center'>
					Нажимая на кнопку Вы даете согласие на обработку персональных данных и
					соглашаетесь с{' '}
					<a className='underline font-medium' href='#!'>
						Политикой конфиденциальности
					</a>
				</p>
			</div>
			<div className='flex justify-center pb-5'>
				<input
					type='submit'
					className='bg-[#37AF24] text-xl py-2 px-5 rounded-lg text-white hover:bg-[#1f7e10] duration-100'
					value='Отправить мой запрос'
					aria-label='Submit my request'
				/>
			</div>
		</form>
	)
}
