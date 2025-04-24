import { Callout } from '@/components/mdx/Callout'
import MDXComponents from '@/components/mdx/MDXComponents'
import { LOCALES, type Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/utils'

import type { BlogPost } from '@/types/blog'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { notFound } from 'next/navigation'

type Params = Promise<{
	locale: string
	slug: string
}>

type MetadataProps = {
	params: Params
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale, slug } = await params
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale)
	const blog = blogs.find((blog) => blog.slug === `/${slug}`)

	if (!blog) {
		return generateBlogMetadata({
			title: '404',
			description: 'Page not found',
			noIndex: true,
			locale: locale as Locale,
			path: `/blogs/${slug}`
		})
	}

	return generateBlogMetadata({
		page: 'blogs',
		title: blog.title,
		description: blog.description,
		images: blog.image ? [blog.image] : [],
		locale: locale as Locale,
		path: `/blogs/${slug}`
		// canonicalUrl: `/blogs/${slug}`,
	})
}

export default async function BlogPage({ params }: { params: Params }) {
	const { locale, slug } = await params
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale)

	const blog = blogs.find((blog) => blog.slug === `/${slug}`)

	if (!blog) {
		return notFound()
	}

	return (
		<div className='w-full md:w-3/5 px-2 md:px-12'>
			<h1 className='break-words text-4xl font-bold mt-6 mb-4'>{blog.title}</h1>
			{blog.image && <img src={blog.image} alt={blog.title} className='rounded-sm' />}
			{blog.tags?.split(',').length ? (
				<div className='flex flex-wrap gap-2'>
					{blog.tags.split(',').map((tag) => {
						return (
							<div
								key={tag}
								className={`rounded-md bg-gray-200 hover:!no-underline dark:bg-[#24272E] flex px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-black hover:dark:bg-[#15AFD04C] hover:dark:text-[#82E9FF] text-gray-500 dark:text-[#7F818C] outline-none focus-visible:ring transition`}
							>
								{tag.trim()}
							</div>
						)
					})}
				</div>
			) : (
				<></>
			)}
			{blog.description && <Callout>{blog.description}</Callout>}
			<MDXRemote source={blog?.content || ''} components={MDXComponents} />
		</div>
	)
}

export async function generateStaticParams() {
	let blogs = (await getBlogs()).blogs

	blogs = blogs.filter((blog) => blog.slug)

	return LOCALES.flatMap((locale) =>
		blogs.map((blog) => {
			const slugPart = blog.slug.replace(/^\//, '').replace(/^blogs\//, '')

			return {
				locale,
				slug: slugPart
			}
		})
	)
}
