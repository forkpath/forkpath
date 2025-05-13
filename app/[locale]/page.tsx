import { BlogList } from '@/components/blog-list'
import { Container } from '@/components/container'
import type { Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Params = Promise<{ locale: string }>

type MetadataProps = {
	params: Params
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Blogs' })

	return generateBlogMetadata({
		page: 'Blogs',
		title: t('title'),
		description: t('description'),
		locale: locale as Locale,
		path: `/`
	})
}

export default async function Page({ params }: { params: Params }) {
	const { locale } = await params
	const { blogs } = await getBlogs(locale)
	return (
		<div className='w-full max-w-5xl flex items-start justify-start'>
			<Container className='min-h-screen px-4 md:px-8 md:pt-20 md:pb-10'>
				<BlogList blogs={blogs} />
			</Container>
		</div>
	)
}
