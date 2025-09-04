import { BlogList } from '@/components/blog-list'
import type { Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Params = { locale: string }

type MetadataProps = {
	params: Promise<Params>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'navs' })

	return generateBlogMetadata({
		page: 'pattern',
		title: t('pattern.title'),
		description: t('pattern.description'),
		locale: locale as Locale,
		path: `/pattern`
	})
}

export default async function Page({ params }: MetadataProps) {
	const { locale } = await params
	const t = await getTranslations({ locale })
	const { blogs } = await getBlogs(locale, 'pattern')

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<BlogList
				locale={locale}
				category={'Pattern'}
				title={'法'}
				description={t('navs.pattern.description')}
				layout='list'
				placeholder={t('action.search')}
				blogs={blogs}
			/>
		</main>
	)
}
