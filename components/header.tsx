'use client'
import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { useState } from 'react'

interface NavItem {
	name: string
	link: string
}

const NavbarLogo = () => {
	return (
		<motion.div whileHover='animate' initial='initial'>
			<Link href='/'>
				<div className='relative overflow-hidden rounded-full'>
					<Image className='h-10 w-10 rounded-full' height='100' width='100' src='/avatar.webp' alt='Avatar' />
					<motion.div
						variants={{
							initial: {
								x: -50,
								opacity: 0
							},
							animate: {
								x: 100,
								opacity: 0.7,
								transition: {
									duration: 1,
									ease: 'easeInOut'
								}
							}
						}}
						style={{
							rotate: '15deg'
						}}
						className='absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent blur-sm'
					/>
				</div>
			</Link>
		</motion.div>
	)
}

const DesktopNavBar = ({ navItems }: { navItems: NavItem[] }) => {
	const [hovered, setHovered] = useState<number | null>(null)
	const { scrollY } = useScroll()

	const [scrolled, setScrolled] = useState<boolean>(false)

	const y = useTransform(scrollY, [0, 100], [0, 10])
	const width = useTransform(scrollY, [0, 100], ['92%', '85%'])
	const radius = useTransform(scrollY, [0, 100], ['0rem', '4rem'])

	useMotionValueEvent(scrollY, 'change', (latest: number) => {
		if (latest > 20) {
			setScrolled(true)
		} else {
			setScrolled(false)
		}
	})
	return (
		<div className='fixed inset-x-0 top-0 z-50 hidden md:block'>
			<motion.nav
				style={{
					boxShadow: scrolled
						? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
						: 'none',
					borderRadius: radius,
					width,
					y,
					maxWidth: '80rem'
				}}
				transition={{
					duration: 0.3,
					ease: 'linear'
				}}
				className='mx-auto flex items-center justify-between rounded-full py-2 px-4 backdrop-blur-sm dark:bg-neutral-900/50'
			>
				<NavbarLogo />
				<div className={cn('select-none flex items-center')}>
					{navItems.map((item, id) => (
						<Link
							key={`link-${id}`}
							href={item.link}
							onMouseEnter={() => setHovered(id)}
							onMouseLeave={() => setHovered(null)}
							className='relative px-4 py-2 text-neutral-600 dark:text-neutral-300'
						>
							{hovered === id && (
								<motion.span
									layoutId='hovered'
									transition={{
										type: 'spring',
										stiffness: 500,
										damping: 30,
										duration: 0.2
									}}
									className='absolute inset-0 h-full w-full rounded-md bg-gray-100 dark:bg-neutral-800'
								/>
							)}
							<span className='relative z-10'>{item.name}</span>
						</Link>
					))}
				</div>
			</motion.nav>
		</div>
	)
}

const MobileNavBar = ({ navItems }: { navItems: NavItem[] }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<motion.nav className='fixed top-0 left-0 z-50 block w-full border-b border-neutral-100 bg-white md:hidden dark:border-neutral-800 dark:bg-neutral-900'>
			<>
				<div className='flex w-full items-center justify-between px-4 py-3'>
					<NavbarLogo />
					<Menu className='text-black dark:text-white' onClick={toggleMenu} />
				</div>

				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-900'
						>
							<div className='flex w-full items-center justify-end p-4'>
								<X className='text-black dark:text-white' onClick={toggleMenu} />
							</div>

							<div className='flex flex-1 flex-col items-center justify-center gap-8'>
								{navItems.map((item, index) => (
									<motion.div
										key={item.name}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<Link
											href={item.link}
											onClick={toggleMenu}
											className='text-2xl font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400'
										>
											{item.name}
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</>
		</motion.nav>
	)
}

export function Header() {
	const navItems = [
		{
			name: 'Blog',
			link: '/'
		},
		{
			name: 'Project',
			link: '/project'
		},
		{
			name: 'About',
			link: '/about'
		}
	]

	return (
		<Container>
			{/* 桌面端导航 */}
			<DesktopNavBar navItems={navItems} />
			{/* 移动端导航 */}
			<MobileNavBar navItems={navItems} />
		</Container>
	)
}
