'use client'
import { LocaleSwitch } from '@/components/locale-switch'
import type { NavItem } from '@/types/config'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
export const TopNav = ({ brand, navs }: { brand: string; navs: NavItem[] }) => {
	return (
		<div className='sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
			<div className='mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center gap-4'>
				<Link href='/' className='flex items-center gap-2 focus:outline-none'>
					<motion.div whileHover='animate' initial='initial'>
						<Image className='h-10 w-10 rounded-full' height='100' width='100' src='/avatar.webp' alt='Avatar' />
					</motion.div>
					<span className='hidden sm:block tracking-widest text-xs text-neutral-600'>{brand}</span>
				</Link>
				<nav className='ml-2 flex items-center gap-3 overflow-x-auto text-xs text-neutral-600'>
					{navs.map((nav) => (
						<Link key={nav.key} href={nav.href} className='px-2 py-1 rounded-full hover:bg-neutral-100'>
							{nav.title}
						</Link>
					))}
				</nav>
				<div className='ml-auto'>
					<LocaleSwitch />
				</div>
			</div>
		</div>
	)
}
