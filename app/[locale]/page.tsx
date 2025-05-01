import { Link as I18nLink, type Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'
import dayjs from 'dayjs'
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

	const t = await getTranslations('Blogs')

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-8 text-center'>{t('title')}</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{blogs.map((blog) => (
					<I18nLink key={blog.slug} href={`/blog/${blog.slug}`} prefetch={false} className='hover:underline'>
						<div className='py-3 flex-1 flex flex-col'>
							<h2 className='text-lg font-500 line-clamp-2 flex-grow'>{blog.title}</h2>
							<p className='text-gray-600 dark:text-gray-400 text-sm mt-2'>{dayjs(blog.date).format('YYYY-MM-DD')}</p>
						</div>
					</I18nLink>
				))}
			</div>
		</div>
	)
}
