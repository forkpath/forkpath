'use client'
import type { Locale } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const Comments = ({ repo, locale }: { repo: string; locale: Locale }) => {
	const t = useTranslations()
	const ref = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()
	const [isClient, setIsClient] = useState(false)

	// 确保只在客户端运行
	useEffect(() => {
		setIsClient(true)
	}, [])

	useEffect(() => {
		if (!isClient || !ref.current) {
			return
		}

		// 清理之前的内容
		ref.current.innerHTML = ''

		// 延迟加载 utterances 确保 DOM 完全准备好
		const timer = setTimeout(() => {
			if (!ref.current) {
				return
			}

			const s = document.createElement('script')
			s.src = 'https://utteranc.es/client.js'
			s.async = true
			s.crossOrigin = 'anonymous'
			s.setAttribute('repo', repo)
			s.setAttribute('issue-term', 'pathname')
			s.setAttribute('label', locale === 'en' ? 'comment' : '评论')
			s.setAttribute('theme', 'github-light')

			ref.current.appendChild(s)
		}, 100)

		return () => clearTimeout(timer)
	}, [repo, locale, pathname, isClient])

	// 服务端渲染时不渲染 Comments
	if (!isClient) {
		return null
	}

	return (
		<section className='mt-6'>
			<div className='flex items-center justify-between'>
				<h3 className='text-sm tracking-widest uppercase text-neutral-500'>{t('layout.comment')}</h3>
			</div>
			<div ref={ref} className='mt-2 rounded-2xl border border-neutral-200 bg-white/60 p-4' />
		</section>
	)
}
