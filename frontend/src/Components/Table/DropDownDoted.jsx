import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react'
import { api } from '../../Api/api'
import { VerticalDotsIcon } from './VerticalDotsIcon'
import { useRouter } from 'next/navigation'

const DropDownDoted = ({ id, params, onDelete }) => {
	const router = useRouter()
	const DeleteData = async id => {
		try {
			await api.delete(`${params.slug}/${id}`)
			onDelete(id) // Call this after successful API call
		} catch (error) {
			console.error('There was an error deleting the item:', error)
		}
	}
	return (
		<div className='relative flex justify-end items-center gap-2'>
			<Dropdown className='dark text-white'>
				<DropdownTrigger>
					<Button isIconOnly size='sm' variant='light'>
						<VerticalDotsIcon className='text-default-300' />
					</Button>
				</DropdownTrigger>
				<DropdownMenu>
					{/*<DropdownItem>View</DropdownItem>*/}
					<DropdownItem
						startContent={<i className='fas fa-edit'></i>}
						onClick={() => router.push(`/admin/${params.slug}/edit/${id}`)}
					>
						Edit
					</DropdownItem>
					<DropdownItem startContent={<i className='fas fa-trash'></i>} className='text-red' onClick={() => DeleteData(id)}>Delete</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	)
}

export default DropDownDoted
