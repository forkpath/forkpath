import { BlogList } from '@/components/blog-list'
import { BlogPin } from '@/components/blog-pin'
import { Container } from '@/components/container'
import type { Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'
import type { BlogPost } from '@/types/blog'
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

	const pinBlog = blogs
		.filter((blog) => blog.pin && blog.date)
		.reduce<BlogPost | null>((latest, current) => {
			return !latest ? current : dayjs(current.date).isAfter(dayjs(latest.date)) ? current : latest
		}, null)

	return (
		<div className='w-full max-w-5xl flex items-start justify-start'>
			<Container className='min-h-screen flex flex-col items-center px-4 md:px-8 md:pt-20 md:pb-10'>
				<div className='relative z-20 py-10 md:pt-20'>
					<h1 className='mt-4 text-xl font-bold md:text-3xl lg:text-5xl text-black dark:text-white tracking-tight'>
						Blog Center
					</h1>
				</div>
				<BlogPin blog={pinBlog} />
				<BlogList blogs={blogs} />
			</Container>
		</div>
	)
}
