import MDXComponents from '@/components/mdx/MDXComponents'
import { Toc } from '@/components/toc'
import { LOCALES, type Locale } from '@/i18n/routing'
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

type MetadataProps = {
	params: Params
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale, slug } = await params
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale, 'method')
	const blog = blogs.find((blog) => blog.metadata.slug === `/${slug}`)

	if (!blog) {
		return generateBlogMetadata({
			title: '404',
			description: 'Page not found',
			noIndex: true,
			locale: locale as Locale,
			path: `/method/${slug}`
		})
	}

	return generateBlogMetadata({
		page: 'method',
		title: blog.title,
		description: blog.description,
		images: blog.image ? [blog.image] : [],
		locale: locale as Locale,
		path: `/method/${slug}`
		// canonicalUrl: `/blogs/${slug}`,
	})
}

export default async function MethodBlog({ params }: { params: Params }) {
	const { locale, slug } = await params
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale, 'method')

	const blog = blogs.find((blog) => blog.metadata.slug === slug)

	if (!blog) {
		return notFound()
	}

	return (
		<main className='mx-auto max-w-7xl px-6 pb-16 md:pb-24'>
			<div className='mt-6 mb-8 md:mb-10 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8'>
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
				<Toc links={blog.headings} />
			</div>
			<Comments repo='xieyaxing/blog' locale={locale as Locale} />
		</main>
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
