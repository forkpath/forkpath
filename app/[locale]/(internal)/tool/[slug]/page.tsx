import MDXComponents from '@/components/mdx/MDXComponents'
import { Toc } from '@/components/toc'
import type { Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'

import { Comments } from '@/components/comments'
import type { BlogPost } from '@/types/blog'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Params = Promise<{
	locale: string
	slug: string
}>

// ISR: 1小时重新验证
export const revalidate = 3600

type MetadataProps = {
	params: Params
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale, slug } = await params
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale, 'tool')
	const blog = blogs.find((blog) => blog.metadata.slug === `/${slug}`)

	if (!blog) {
		return generateBlogMetadata({
			title: '404',
			description: 'Page not found',
			noIndex: true,
			locale: locale as Locale,
			path: `/tool/${slug}`
		})
	}

	return generateBlogMetadata({
		page: 'tool',
		title: blog.title,
		description: blog.description,
		images: blog.image ? [blog.image] : [],
		locale: locale as Locale,
		path: `/tool/${slug}`
		// canonicalUrl: `/blogs/${slug}`,
	})
}

export default async function ToolBlog({ params }: { params: Params }) {
	const { locale, slug } = await params
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale, 'tool')

	const blog = blogs.find((blog) => blog.metadata.slug === slug)

	if (!blog) {
		return notFound()
	}

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<div className='mt-6 mb-8 md:mb-10 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8'>
				<div>
					<article className='prose prose-neutral max-w-none bg-white/70 rounded-3xl border border-neutral-200 p-6 md:p-10'>
						<Image
							src={blog.image}
							alt={blog.title}
							width='672'
							height='384'
							className='rouned-full mx-auto mb-20 max-h-96 w-full max-w-2xl rounded-2xl object-cover shadow-xl'
						/>
						<MDXRemote source={blog.content} components={MDXComponents} />
					</article>
					<Comments repo='forkpath/forkpath' locale={locale as Locale} />
				</div>
				<Toc links={blog.headings} />
			</div>
		</main>
	)
}
