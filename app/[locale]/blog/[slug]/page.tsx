import { Container } from '@/components/container'
import MDXComponents from '@/components/mdx/MDXComponents'
import { Toc } from '@/components/toc'
import { LOCALES, type Locale } from '@/i18n/routing'
import { generateBlogMetadata, getBlogs } from '@/lib/generators'

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
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale)
	const blog = blogs.find((blog) => blog.slug === `/${slug}`)

	if (!blog) {
		return generateBlogMetadata({
			title: '404',
			description: 'Page not found',
			noIndex: true,
			locale: locale as Locale,
			path: `/blog/${slug}`
		})
	}

	return generateBlogMetadata({
		page: 'blog',
		title: blog.title,
		description: blog.description,
		images: blog.image ? [blog.image] : [],
		locale: locale as Locale,
		path: `/blog/${slug}`
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
		<div className='flex flex-col gap-4 md:flex-row min-h-screen items-start justify-start'>
			<Toc links={blog.headings} />
			<Container className='min-h-screen px-8 md:pt-24 md:pb-10'>
				<Image
					src={blog.image}
					alt={blog.title}
					width='672'
					height='384'
					className='rouned-full mx-auto mb-20 max-h-96 w-full max-w-2xl rounded-2xl object-cover shadow-xl'
				/>
				<MDXRemote source={blog.content} components={MDXComponents} />
			</Container>
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
