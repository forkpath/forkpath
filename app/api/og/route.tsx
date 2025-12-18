import { ImageResponse } from 'next/og'

import { getTranslations } from 'next-intl/server'
import { DEFAULT_LOCALE } from '@/i18n/routing'
import { getBlogs } from '@/lib/generators'
import type { BlogPost } from '@/types/blog'

export const runtime = 'edge'
export const alt = 'Open Graph Image'
export const contentType = 'image/png'
export const size = {
	width: 1200,
	height: 630
}

// 分类标识映射
const categoryLabels: Record<string, string> = {
	principle: '道',
	pattern: '法',
	method: '术',
	tool: '器'
}

// 生成首页 OG 图片
async function generateHomeImage(locale: string) {
	const t = await getTranslations({ locale })

	return new ImageResponse(
		<div
			style={{
				fontSize: 128,
				background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '80px',
				fontFamily: 'system-ui, sans-serif'
			}}
		>
			<div
				style={{
					fontSize: 72,
					fontWeight: 300,
					marginBottom: 24,
					letterSpacing: '0.1em',
					color: '#171717'
				}}
			>
				{t('navs.home.title')}
			</div>
			<div
				style={{
					fontSize: 36,
					color: '#525252',
					marginBottom: 40,
					fontWeight: 300
				}}
			>
				{t('navs.home.description')}
			</div>
			<div
				style={{
					fontSize: 24,
					color: '#737373',
					fontWeight: 300,
					letterSpacing: '0.2em'
				}}
			>
				{t('home.subTitle')}
			</div>
		</div>,
		{
			...size
		}
	)
}

// 生成分类列表页 OG 图片
async function generateCategoryImage(locale: string, category: string) {
	const t = await getTranslations({ locale, namespace: 'navs' })
	const categoryKey = category as keyof typeof categoryLabels
	const label = categoryLabels[categoryKey] || category

	return new ImageResponse(
		<div
			style={{
				fontSize: 128,
				background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '80px',
				fontFamily: 'system-ui, sans-serif'
			}}
		>
			<div
				style={{
					fontSize: 120,
					fontWeight: 200,
					marginBottom: 40,
					color: '#171717',
					letterSpacing: '0.1em'
				}}
			>
				{label}
			</div>
			<div
				style={{
					fontSize: 32,
					color: '#525252',
					fontWeight: 300,
					maxWidth: '800px',
					textAlign: 'center',
					lineHeight: 1.6
				}}
			>
				{t(`${categoryKey}.description`)}
			</div>
		</div>,
		{
			...size
		}
	)
}

// 生成博客详情页 OG 图片
async function generateBlogImage(locale: string, category: string, slug: string) {
	const { blogs }: { blogs: BlogPost[] } = await getBlogs(locale, category as any)
	const blog = blogs.find((blog) => {
		const metadataSlug = blog.metadata.slug
		return metadataSlug === slug || metadataSlug === `/${slug}` || metadataSlug === slug.replace(/^\//, '')
	})

	if (!blog) {
		return new ImageResponse(
			<div
				style={{
					fontSize: 128,
					background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily: 'system-ui, sans-serif'
				}}
			>
				<div style={{ fontSize: 48, color: '#737373' }}>404 - Page Not Found</div>
			</div>,
			{
				...size
			}
		)
	}

	const categoryKey = category as keyof typeof categoryLabels
	const label = categoryLabels[categoryKey] || category

	return new ImageResponse(
		<div
			style={{
				fontSize: 128,
				background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				padding: '80px',
				fontFamily: 'system-ui, sans-serif'
			}}
		>
			<div
				style={{
					fontSize: 24,
					color: '#737373',
					marginBottom: 20,
					fontWeight: 300,
					letterSpacing: '0.1em'
				}}
			>
				{label}
			</div>
			<div
				style={{
					fontSize: 56,
					fontWeight: 600,
					color: '#171717',
					marginBottom: 24,
					lineHeight: 1.2,
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden'
				}}
			>
				{blog.title}
			</div>
			{blog.description && (
				<div
					style={{
						fontSize: 28,
						color: '#525252',
						fontWeight: 300,
						lineHeight: 1.5,
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden'
					}}
				>
					{blog.description}
				</div>
			)}
		</div>,
		{
			...size
		}
	)
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const type = searchParams.get('type') || 'home'
	const locale = searchParams.get('locale') || DEFAULT_LOCALE
	const category = searchParams.get('category')
	const slug = searchParams.get('slug')

	try {
		switch (type) {
			case 'home':
				return await generateHomeImage(locale)
			case 'category':
				if (!category) {
					return new Response('Category parameter is required', { status: 400 })
				}
				return await generateCategoryImage(locale, category)
			case 'blog':
				if (!category || !slug) {
					return new Response('Category and slug parameters are required', { status: 400 })
				}
				return await generateBlogImage(locale, category, slug)
			default:
				return new Response('Invalid type parameter', { status: 400 })
		}
	} catch (error) {
		console.error('Error generating OG image:', error)
		return new Response('Error generating image', { status: 500 })
	}
}
