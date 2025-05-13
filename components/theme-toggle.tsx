'use client'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()

	return (
		<button
			type='button'
			className='flex items-center rounded-md px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? (
				<motion.span
					key={String(theme)}
					initial={{ opacity: 0, rotate: 90 }}
					animate={{ opacity: 1, rotate: 0 }}
					transition={{ duration: 0.3 }}
					className='inline-block'
				>
					<Moon className='dark:text-secondary h-4 w-4 text-neutral-700' />
				</motion.span>
			) : (
				<motion.span
					key={String(theme)}
					initial={{ opacity: 0, rotate: -90 }}
					animate={{ opacity: 1, rotate: 0 }}
					transition={{ duration: 0.3 }}
					className='inline-block'
				>
					<Sun className='dark:text-secondary h-4 w-4 text-neutral-700' />
				</motion.span>
			)}
		</button>
	)
}
