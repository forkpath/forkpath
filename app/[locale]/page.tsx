'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function HomePage() {
	const t = useTranslations()
	const router = useRouter()

	const blocks = [
		{
			key: 'principle',
			watermark: '道',
			title: t('navs.principle.title'),
			span: 'md:col-span-2 md:row-span-2',
			desc: t('navs.principle.description')
		},
		{
			key: 'pattern',
			watermark: '法',
			title: t('navs.pattern.title'),
			span: 'md:col-span-1 md:row-span-1',
			desc: t('navs.pattern.description')
		},
		{
			key: 'method',
			watermark: '术',
			title: t('navs.method.title'),
			span: 'md:col-span-2 md:row-span-1',
			desc: t('navs.method.description')
		},
		{
			key: 'tool',
			watermark: '器',
			title: t('navs.tool.title'),
			span: 'md:col-span-1 md:row-span-2',
			desc: t('navs.tool.description')
		},
		{
			key: 'vision',
			watermark: '相',
			title: t('navs.vision.title'),
			span: 'md:col-span-2 md:row-span-1',
			desc: t('navs.vision.description')
		}
	]

	return (
		<div className='min-h-screen'>
			<header className='mx-auto max-w-7xl px-6 pt-4 pb-10 md:pb-12'>
				<div className='mt-2 md:mt-4 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-start'>
					<div className='hidden md:block' style={{ writingMode: 'vertical-rl' }}>
						<span className='tracking-widest text-neutral-400'>道法术器相</span>
					</div>
					<div>
						<motion.h1
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: 'easeOut' }}
							className='text-4xl md:text-6xl font-extralight leading-tight'
						>
							{t('home.title')}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
							className='mt-4 max-w-xl text-neutral-600'
						>
							{t('home.subTitle')}
						</motion.p>
					</div>
				</div>
			</header>

			<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
				<div className='grid grid-cols-1 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-5 md:gap-6'>
					{blocks.map((block: any, index: number) => (
						<motion.button
							key={block.key}
							onClick={() => router.push(`/${block.key}`)}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							className={`relative group w-full h-full overflow-hidden cursor-pointer rounded-3xl border border-neutral-200 bg-white/70 backdrop-blur-[1px] p-6 md:p-8 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-neutral-300 ${block.span}`}
							aria-label={block.title}
						>
							{/* Kanji strokes */}
							<svg
								aria-hidden
								className='pointer-events-none absolute -top-px left-6 h-6 w-10 text-neutral-300'
								viewBox='0 0 40 24'
								fill='none'
							>
								<title>top-stroke</title>
								<path d='M1 23 C12 23 12 1 39 1' stroke='currentColor' strokeWidth='1' strokeLinecap='round' />
							</svg>
							<svg
								aria-hidden
								className='pointer-events-none absolute -bottom-px right-6 h-6 w-10 rotate-180 text-neutral-300'
								viewBox='0 0 40 24'
								fill='none'
							>
								<title>bottom-stroke</title>
								<path d='M1 23 C12 23 12 1 39 1' stroke='currentColor' strokeWidth='1' strokeLinecap='round' />
							</svg>
							{/* Watermark */}
							<span className='pointer-events-none absolute right-4 top-2 text-5xl md:text-6xl lg:text-7xl font-light text-neutral-200/60 select-none'>
								{block.watermark}
							</span>
							{/* Title Row */}
							<div className='relative z-10 flex items-center gap-3'>
								<div className='text-sm tracking-widest uppercase text-neutral-400'>{block.key}</div>
								<span className='h-px w-10 bg-neutral-200 group-hover:w-14 transition-all' />
							</div>
							{/* Description */}
							<p className='relative z-10 mt-4 max-w-xs text-sm leading-relaxed text-neutral-600'>{block.desc}</p>
							{/* CTA */}
							<div className='relative z-10 mt-6 flex items-center gap-2 text-sm text-neutral-700'>
								{t('action.enter')}
								<svg
									viewBox='0 0 24 24'
									className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<title>enter</title>
									<path d='M5 12h14M13 5l7 7-7 7' />
								</svg>
							</div>
							{/* Underlay */}
							<span className='pointer-events-none absolute inset-x-5 bottom-5 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent' />
						</motion.button>
					))}
				</div>

				{/* Divider */}
				<div className='mt-16 md:mt-20 flex items-center gap-4 text-neutral-400'>
					<span className='h-px flex-1 bg-neutral-200' />
					<span className='tracking-widest' style={{ letterSpacing: '.4em' }}>
						{t('home.motto')}
					</span>
					<span className='h-px flex-1 bg-neutral-200' />
				</div>

				{/* About */}
				<section className='mt-10 md:mt-14 rounded-3xl border border-neutral-200 bg-white/60 p-8 md:p-12'>
					<h2 className='tracking-widest text-neutral-500 uppercase'>{t('author.name')}</h2>
					<p className='mt-4 text-sm text-neutral-600 leading-relaxed'>{t('author.description')}</p>
				</section>
			</main>
		</div>
	)
}
