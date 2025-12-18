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
		page: 'principle',
		title: t('principle.title'),
		description: t('principle.description'),
		locale: locale as Locale,
		path: `/principle`
	})
}

export default async function Page({ params }: MetadataProps) {
	const { locale } = await params
	const t = await getTranslations({ locale })
	const { blogs } = await getBlogs(locale, 'principle')

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<BlogList
				locale={locale}
				category={'Principle'}
				title={'法'}
				description={t('navs.principle.description')}
				layout='list'
				placeholder={t('action.search')}
				blogs={blogs}
			/>
		</main>
	)
}
