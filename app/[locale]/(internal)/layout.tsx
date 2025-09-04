import { TopNav } from '@/components/top-nav'
import type { NavItem } from '@/types/config'
import { getTranslations } from 'next-intl/server'
import type React from 'react'

export default async function InternalLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const t = await getTranslations()
	const brand = t('author.name')
	const navs: NavItem[] = [
		{ key: 'principle', title: t('navs.principle.title'), href: '/principle' },
		{ key: 'pattern', title: t('navs.pattern.title'), href: '/pattern' },
		{ key: 'method', title: t('navs.method.title'), href: '/method' },
		{ key: 'tool', title: t('navs.tool.title'), href: '/tool' },
		{ key: 'vision', title: t('navs.vision.title'), href: '/vision' }
	]

	return (
		<>
			<TopNav brand={brand} navs={navs} />
			{children}
		</>
	)
}
