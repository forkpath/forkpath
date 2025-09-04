import type { Locale } from '@/i18n/routing'
import type { Category } from '@/types/config'

/**
 * canonicalUrl 用于标识页面的规范 URL。
 * 它在 SEO 中非常重要，可以避免由于内容重复或多个 URL 版本导致的排名下降。
 * 在博客系统中，通常会将 canonicalUrl 添加到页面的 <head> 部分，作为 <link rel="canonical"> 标签来指导搜索引擎。
 */
export type BlogMetadata = {
	page?: string
	title?: string
	description?: string
	images?: string[]
	noIndex?: boolean
	locale: Locale
	path?: string
	canonicalUrl?: string // 在博客系统或者CMS中，canonicalUrl 是指一个网页的标准 URL，用于告诉搜索引擎该网页的主要版本，以避免重复内容的问题
}

export type BlogToc = {
	text: string
	id: string
}[]

export type BlogPost = {
	locale?: string
	title: string
	description?: string
	image: string
	slug: string
	tags?: string
	date: Date
	visible?: 'draft' | 'invisible' | 'published'
	category?: Category
	pin?: boolean
	content: string
	metadata: {
		[key: string]: any
	}
	headings: BlogToc // 在博客内页中，我在左侧提供了一个toc方便阅读长文，toc通过remark解析进行提取
}

export type ImageMeta = {
	url: string
	title: string
	description: string
	date: Date
	tag: 'photo' | 'illustration' | 'aigc'
}
