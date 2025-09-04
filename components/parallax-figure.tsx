'use client'
import { type MotionValue, motion, useTransform } from 'framer-motion'

export const ParallaxFigure = ({
	idx,
	onOpenAction,
	scrollY,
	src,
	alt
}: {
	idx: number
	onOpenAction: () => void
	scrollY: MotionValue<number>
	src: string
	alt: string
}) => {
	const base = useTransform(scrollY, [0, 1000], [0, -10 - idx * 2])
	return (
		<motion.figure
			style={{ y: base, willChange: 'transform' }}
			className='mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-neutral-200 bg-white/50'
		>
			<button
				type='button'
				onClick={onOpenAction}
				className='block w-full cursor-zoom-in focus:outline-none'
				aria-label='Open image'
			>
				<img src={src} alt={alt} className='w-full h-auto object-cover' />
			</button>
		</motion.figure>
	)
}
