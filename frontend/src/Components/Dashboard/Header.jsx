import Link from 'next/link'

const Header = () => {

    return (
        <header>
            <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            className="fas fa-bars"></i></a>
                    </li>
                    <li className='nav-item d-none d-sm-inline-block'>
                        <Link href='/' className='nav-link'>
                            Перейти на сайт
                        </Link>
                    </li>
                    <li className='nav-item d-none d-sm-inline-block'>
                        <Link href='/admin' className='nav-link'>
                            Вернуться на главную
                        </Link>
                    </li>
                    <li className='nav-item d-none d-sm-inline-block'>
                        <Link href='/exit' className='nav-link'>
                            Выход
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
