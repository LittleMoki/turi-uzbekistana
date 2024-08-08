import { Select, SelectItem } from '@nextui-org/react'

const CustomSelect = ({
	data,
	description,
	fn,
	value,
	label,
	type = 'services',
	name,
}) => {
	return (
		<Select
			label={label}
			selectedKeys={type === 'services' ? value : [value]}
			onSelectionChange={
				type === 'services' ? fn : e => fn({ target: { name, value: e[0] } })
			}
			className='w-full'
			name={name}
			description={description}
		>
			{data.map(el => (
				<SelectItem
					key={el.value}
					value={el.value}
					textValue={el.label}
					style={{ color: 'black' }}
				>
					{el.label}
				</SelectItem>
			))}
		</Select>
	)
}

export default CustomSelect
