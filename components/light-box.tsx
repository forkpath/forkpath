import type { ImageMeta } from '@/types/blog'
import { useTranslations } from 'next-intl'

export const LightBox = ({
	images,
	index,
	onClose,
	onNext,
	onPrev
}: {
	images: ImageMeta[]
	index: number
	onClose: () => void
	onNext: () => void
	onPrev: () => void
}) => {
	const t = useTranslations()
	const image = images[index]
	const total = images.length
	const position = index + 1
	return (
		<div role='dialog' aria-modal='true' className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-black/70'
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						onClose()
					}
				}}
				role='button'
				tabIndex={0}
				aria-label='Close lightbox'
			/>
			<div
				className='relative max-w-5xl w-full z-10'
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<div className='rounded-2xl overflow-hidden bg-white'>
					<div className='bg-black flex items-center justify-center'>
						<img src={image.url} alt='' className='max-h-[70vh] w-full object-contain' />
					</div>
					<div className='p-4 flex items-center gap-3 text-sm text-neutral-700'>
						<span className='rounded-full border px-2 py-0.5 text-xs text-neutral-500'>
							{position}/{total}
						</span>
						<span className='truncate flex-1'>
							{(() => {
								try {
									return new URL(image.url).hostname
								} catch {
									return ''
								}
							})()} — {position}
						</span>
						<button
							type='button'
							onClick={onPrev}
							className='rounded-full border cursor-pointer px-3 py-1 hover:bg-neutral-50'
						>
							‹ {t('action.prev')}
						</button>
						<button
							type='button'
							onClick={onNext}
							className='rounded-full border cursor-pointer px-3 py-1 hover:bg-neutral-50'
						>
							{t('action.next')} ›
						</button>
						<button
							type='button'
							onClick={onClose}
							className='rounded-full border cursor-pointer px-3 py-1 hover:bg-neutral-50'
						>
							{t('action.close')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
