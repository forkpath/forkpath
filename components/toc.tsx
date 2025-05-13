'use client'
import type { BlogToc } from '@/types/blog'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

export const Toc = ({ links }: { links: BlogToc }) => {
	const [hovered, setHovered] = useState<number | null>(null)
	return (
		<div className='sticky left-0 top-24 hidden max-w-sm flex-col self-start px-5 md:flex'>
			{links.map((link, index) => (
				<Link
					className='group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200'
					key={index}
					href={link.id}
					onMouseEnter={() => setHovered(index)}
					onMouseLeave={() => setHovered(null)}
				>
					{hovered === index && (
						<motion.span
							layoutId='toc-indicator'
							className='absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700'
						/>
					)}
					<span className='inline-block transition duration-200 group-hover/toc-link:translate-x-1'>{link.text}</span>
				</Link>
			))}
		</div>
	)
}
