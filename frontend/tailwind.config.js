/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/Components/**/*.{js,ts,jsx,tsx,mdx}', // Added Components directory
		'./src/Models/**/*.{js,ts,jsx,tsx,mdx}', // Added Models directory
		'./src/Pages/**/*.{js,ts,jsx,tsx,mdx}', // Added Pages directory
		'./src/UI/**/*.{js,ts,jsx,tsx,mdx}', // Added UI directory
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
			}
		},
	},
	plugins: [nextui()],
}
