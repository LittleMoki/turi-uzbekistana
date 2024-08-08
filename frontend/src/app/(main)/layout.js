import { Footer } from '../../Models/FooterModules/Footer'
import { Header } from '../../Models/HeaderModules/Header'
import { TopMenu } from '../../Models/HeaderModules/TopMenu'

const Layout = ({ children }) => {
	return (
		<>
			<TopMenu />
			<Header />
			<main className='flex flex-col'>{children}</main>
			<Footer />
		</>
	)
}

export default Layout
