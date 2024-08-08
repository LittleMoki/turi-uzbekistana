import Link from 'next/link'
const AdminButton = ({ children,style, className, icon, link }) => {
	return (
		<Link
			className='text-white py-[6px] px-[12px] rounded-md '
			href={link}
			style={style}
		>
			<i className={icon}></i>
			<button>{children}</button>
		</Link>
	)
}

export default AdminButton
