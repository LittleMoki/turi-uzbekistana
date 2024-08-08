import { Button } from '@nextui-org/react'

const CustomButton = ({ children, type = 'submit', fn,className,startContent }) => {
	return (
		<Button startContent={startContent} className={`dark w-[150px] ${className}`} onClick={fn} type={type}>
			{children}
		</Button>
	)
}

export default CustomButton
