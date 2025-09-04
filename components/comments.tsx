'use client'
import type { Locale } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

export const Comments = ({ repo, locale }: { repo: string; locale: Locale }) => {
	const t = useTranslations()
	const ref = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		if (!ref.current) {
			return
		}
		ref.current.innerHTML = ''
		const s = document.createElement('script')
		s.src = 'https://utteranc.es/client.js'
		s.async = true
		s.crossOrigin = 'anonymous'
		s.setAttribute('repo', repo)
		s.setAttribute('issue-term', 'pathname')
		s.setAttribute('label', 'comment')
		s.setAttribute('theme', 'github-light')
		ref.current.appendChild(s)
	}, [repo, locale])
	return (
		<section className='mt-10'>
			<div className='flex items-center justify-between'>
				<h3 className='text-sm tracking-widest uppercase text-neutral-500'>{t('layout.comment')}</h3>
			</div>
			<div ref={ref} className='mt-4 rounded-2xl border border-neutral-200 bg-white/60 p-4' />
		</section>
	)
}
