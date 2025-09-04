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
		page: ' tool',
		title: t('tool.title'),
		description: t('tool.description'),
		locale: locale as Locale,
		path: `/tool`
	})
}

export default async function Page({ params }: MetadataProps) {
	const { locale } = await params
	const t = await getTranslations({ locale })
	const { blogs } = await getBlogs(locale, 'tool')

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<BlogList
				locale={locale}
				category={'Tool'}
				title={'术'}
				description={t('navs.tool.description')}
				layout='grid'
				placeholder={t('action.search')}
				blogs={blogs}
			/>
		</main>
	)
}
