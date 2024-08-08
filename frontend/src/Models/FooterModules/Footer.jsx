import { FooterBottom } from './FooterBottom'
import { FooterTop } from './FooterTop'

export const Footer = () => {
	return (
		<footer className='bg-white border-t-8 py-10'>
			<div className='px-3 mx-auto'>
				<FooterTop />
				<FooterBottom />
			</div>
		</footer>
	)
}
