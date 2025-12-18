'use client'
import { useParams } from 'next/navigation'

import { useLocale } from 'next-intl'
import { startTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/routing'

export const LocaleSwitch = () => {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const params = useParams()
	const setLang = (language: string) => {
		startTransition(() => {
			// @ts-expect-error -- TypeScript will validate that only known `params`
			// are used in combination with a given `pathname`. Since the two will
			// always match for the current route, we can skip runtime checks.
			router.replace({ pathname, params }, { locale: language })
		})
	}
	return (
		<div className='rounded-full border border-neutral-300 bg-white p-1 flex items-center text-xs shadow-sm'>
			<button
				type='button'
				onClick={() => setLang('en')}
				className={`px-3 py-1 rounded-full transition ${locale === 'en' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
			>
				EN
			</button>
			<button
				type='button'
				onClick={() => setLang('zh')}
				className={`px-3 py-1 rounded-full transition ${locale === 'zh' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
			>
				中
			</button>
		</div>
	)
}
