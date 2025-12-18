import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BlogList } from '@/components/blog-list'
import type { Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'

type Params = { locale: string }

type MetadataProps = {
	params: Promise<Params>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'navs' })

	return generateBlogMetadata({
		page: ' method',
		title: t('method.title'),
		description: t('method.description'),
		locale: locale as Locale,
		path: `/method`
	})
}

export default async function Page({ params }: MetadataProps) {
	const { locale } = await params
	const t = await getTranslations({ locale })
	const { blogs } = await getBlogs(locale, 'method')

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<BlogList
				locale={locale}
				category={'Method'}
				title={'术'}
				description={t('navs.method.description')}
				layout='grid'
				placeholder={t('action.search')}
				blogs={blogs}
			/>
		</main>
	)
}
