import fs from 'node:fs'
import { join } from 'node:path'
import { siteConfig } from '@/configs/site'
import { DEFAULT_LOCALE, LOCALE_NAMES } from '@/i18n/routing'
import type { BlogMetadata, BlogPost } from '@/types/blog'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

const BLOGS_BATCH_SIZE = 12

export async function getBlogs(locale: string = DEFAULT_LOCALE): Promise<{ blogs: BlogPost[] }> {
	const blogsDir = join(process.cwd(), 'content', locale)

	// 目录不存在，直接返回为空
	if (!fs.existsSync(blogsDir)) {
		return { blogs: [] }
	}

	let filenames = await fs.promises.readdir(blogsDir)
	filenames = filenames.reverse()

	let allBlogs: BlogPost[] = []

	// 批量读取mdx
	for (let i = 0; i < filenames.length; i += BLOGS_BATCH_SIZE) {
		const batchFilenames = filenames.slice(i, i + BLOGS_BATCH_SIZE)

		const batchBlogs: BlogPost[] = await Promise.all(
			batchFilenames.map(async (filename: string) => {
				const fullPath = join(blogsDir, filename)
				const blogContent = await fs.promises.readFile(fullPath, 'utf-8')

				const { data, content } = matter(blogContent)

				return {
					locale, // 使用传入的 locale 参数
					title: data.title,
					description: data.description,
					image: data.image || '',
					slug: data.slug,
					tags: data.tags,
					date: data.date,
					visible: data.visible || 'published',
					pin: data.pin || false,
					content,
					metadata: data
				}
			})
		)

		allBlogs.push(...batchBlogs)
	}

	// 过滤掉非发布的文章
	allBlogs = allBlogs.filter((blog: BlogPost) => blog.visible === 'published')

	// 根据时间倒序，但不能越过置顶逻辑
	allBlogs = allBlogs.sort((a: BlogPost, b: BlogPost): number => {
		if (a.pin !== b.pin) {
			return (b.pin ? 1 : 0) - (a.pin ? 1 : 0)
		}

		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return {
		blogs: allBlogs
	}
}

export async function generateBlogMetadata({
	page = 'Home',
	title,
	description,
	images = [],
	noIndex = false,
	locale,
	path,
	canonicalUrl
}: BlogMetadata): Promise<Metadata> {
	// 获取翻译器
	const t = await getTranslations({ locale, namespace: 'Home' })

	// 获取页面特定的元数据翻译

	const blogTitle = title || t('title')
	const blogDescription = description || t('description')

	// 构建完整标题
	const finalTitle = page === 'Home' ? `${blogTitle} - ${t('tagLine')}` : `${blogTitle} | ${t('title')}`

	// 构建图片URL
	const imageUrls =
		images?.length > 0
			? images.map((img) => ({
					url: img.startsWith('http') ? img : `${siteConfig.url}/${img}`,

					alt: blogTitle
				}))
			: [{ url: `${siteConfig.url}/og.png`, alt: blogTitle }]

	// Open Graph Site
	const openGraphUrlPrefix = `${locale === DEFAULT_LOCALE ? '' : locale}${path}` || siteConfig.url

	// 构建备用语言链接
	const alternateLanguages = Object.keys(LOCALE_NAMES).reduce(
		(acc, lang) => {
			const path = canonicalUrl
				? `/${lang === DEFAULT_LOCALE ? '' : lang}${canonicalUrl}`
				: `/${lang === DEFAULT_LOCALE ? '' : lang}`
			acc[lang] = `${siteConfig.url}/${path}`
			return acc
		},
		{} as Record<string, string>
	)

	return {
		title: finalTitle,
		description: blogDescription,
		keywords: [],
		authors: siteConfig.authors,
		creator: siteConfig.creator,
		metadataBase: new URL(siteConfig.url),
		alternates: {
			canonical: canonicalUrl
		},
		openGraph: {
			locale,
			type: 'website',
			title: finalTitle,
			description: blogDescription,
			url: openGraphUrlPrefix,
			siteName: t('title'),
			images: imageUrls
		},
		twitter: {
			card: 'summary_large_image',
			title: finalTitle,
			description: blogDescription,
			site: `${siteConfig.url}/${openGraphUrlPrefix}`,
			images: imageUrls,
			creator: siteConfig.creator
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex
			}
		}
	}
}
