import { AboutAddress } from '../../Models/AboutModule/AboutAddress'
import { AboutContent } from '../../Models/AboutModule/AboutContent'
import { AboutStatistic } from '../../Models/AboutModule/AboutStatistic'
import { AboutTeam } from '../../Models/AboutModule/AboutTeam'

const About = () => {
	return (
		<>
			<h1 className='text-center py-10 mx-auto text-3xl px-3'>
				О нас. Команда Минзифа Тревел - туры в Узбекистан на весь год
			</h1>
			<AboutContent />
			<AboutStatistic />
			<AboutAddress />
			<AboutTeam />
		</>
	)
}

export default About
