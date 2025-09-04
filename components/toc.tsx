'use client'
import type { BlogToc } from '@/types/blog'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

export const Toc = ({ links }: { links: BlogToc }) => {
	const [hovered, setHovered] = useState<number | null>(null)
	const t = useTranslations()
	return (
		<aside className='sticky hidden max-w-sm h-max flex-col self-start px-5 md:flex rounded-3xl border border-neutral-200 bg-white/60 p-5'>
			<div className='text-xs tracking-widest uppercase text-neutral-500 mb-2'>{t('layout.toc')}</div>
			{links.map((link, index) => (
				<Link
					className='group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 '
					key={index}
					href={link.id}
					onMouseEnter={() => setHovered(index)}
					onMouseLeave={() => setHovered(null)}
				>
					{hovered === index && (
						<motion.span
							layoutId='toc-indicator'
							className='absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200'
						/>
					)}
					<span className='inline-block transition duration-200 group-hover/toc-link:translate-x-1'>{link.text}</span>
				</Link>
			))}
		</aside>
	)
}
