'use client'
import { useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LightBox } from '@/components/light-box'
import { ParallaxFigure } from '@/components/parallax-figure'
import type { ImageMeta } from '@/types/blog'

type VisionGalleryProps = {
	images: ImageMeta[]
}

export function VisionGallery({ images }: VisionGalleryProps) {
	const { scrollY } = useScroll()
	const [active, setActive] = useState<number | null>(null)

	function openAt(index: number) {
		setActive(index)
	}
	function close() {
		setActive(null)
	}
	function next() {
		if (active !== null) {
			setActive((active + 1) % images.length)
		}
		return
	}
	function prev() {
		if (active !== null) {
			setActive((active - 1 + images.length) % images.length)
		}
		return
	}

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (active !== null) {
				if (e.key === 'Escape') {
					close()
				} else if (e.key === 'ArrowRight') {
					next()
				} else if (e.key === 'ArrowLeft') {
					prev()
				}
			}
		}

		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [active])

	return (
		<>
			<div className='columns-2 md:columns-3 gap-5 [column-fill:_balance]'>
				{images.map((image, idx: number) => (
					<ParallaxFigure
						key={idx}
						idx={idx}
						scrollY={scrollY}
						src={image.url}
						onOpenAction={() => openAt(idx)}
						alt={image.title}
					/>
				))}
			</div>

			{active !== null && <LightBox images={images} index={active} onClose={close} onNext={next} onPrev={prev} />}
		</>
	)
}
