import { siteConfig } from '@/configs/site'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing'
import { getBlogs } from '@/lib/generators'
import type { MetadataRoute } from 'next'

const siteUrl = siteConfig.url

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// 静态页面
	const staticPages = ['', '/principle', '/pattern', '/method', '/tool', 'vision']

	// 生成多语言页面
	const pages = LOCALES.flatMap((locale) => {
		return staticPages.map((page) => ({
			url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${page}`,
			lastModified: new Date(),
			changeFrequency: 'daily' as ChangeFrequency,
			priority: page === '' ? 1.0 : 0.8
		}))
	})

	const blogs = await Promise.all(
		LOCALES.map(async (locale) => {
			const { blogs } = await getBlogs(locale)
			return blogs.map((blog) => ({
				url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${blog.slug}`,
				lastModified: blog.metadata.updatedAt || blog.date,
				changeFrequency: 'daily' as const,
				priority: 0.7
			}))
		})
	).then((results) => results.flat())

	return [...pages, ...blogs]
}
