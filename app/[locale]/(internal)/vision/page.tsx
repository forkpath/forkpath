import { getTranslations } from 'next-intl/server'
import { VisionGallery } from '@/components/vision-gallery'
import { getImages } from '@/lib/generators'

type Params = Promise<{ locale: string }>

type MetadataProps = {
	params: Params
}

export default async function Page({ params }: MetadataProps) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'navs' })
	const { images } = await getImages(locale)

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<header className='mt-6 rounded-3xl border border-neutral-200 bg-white/70 p-6 md:p-10 mb-8 md:mb-10'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='text-sm tracking-widest uppercase text-neutral-500'>Vision</div>
						<span className='h-px w-10 bg-neutral-200' />
					</div>
					<span className='text-5xl md:text-6xl font-light text-neutral-200/80'>相</span>
				</div>
				<p className='mt-6 max-w-2xl text-neutral-600'>{t('vision.description')}</p>
			</header>

			<VisionGallery images={images} />
		</main>
	)
}
