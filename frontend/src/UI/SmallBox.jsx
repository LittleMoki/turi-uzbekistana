import Link from 'next/link'

const SmallBox = ({ color, icon, value, label, link }) => (
	<div className={`col-3`}>
		<div className={`small-box bg-gradient-${color}`}>
			<div className='inner'>
				<h3>{value}</h3>
				<p>{label}</p>
			</div>
			<div className='icon'>
				<i className={`fas ${icon}`} />
			</div>
			<Link href={link} className='small-box-footer text-white'>
				Подробнее <i className='fas fa-arrow-circle-right' />
			</Link>
		</div>
	</div>
)
export default SmallBox
