const CustomInputAdmin = ({
	children,
	value,
	fn,
	name,
	smallText = '',
	smallTextLink = '',
	linkText = '',
	white = false,
}) => {
	return (
		<label className='flex flex-col gap-1 text-sm w-full'>
			{children}
			<input
				className='py-1 rounded-sm px-2'
				name={name}
				style={{ color: white ? 'white' : 'black' }}
				type='text'
				value={value}
				onChange={fn}
			/>
			<div className='small text-muted'>
				{smallText}
				<a target='_blank' href={smallTextLink}>
					{linkText}
				</a>
			</div>
		</label>
	)
}

export default CustomInputAdmin
