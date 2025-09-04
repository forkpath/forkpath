export type AuthorConfig = {
	name: string
	url: string
}

export type Category = 'principle' | 'pattern' | 'method' | 'tool' | 'vision'

export type NavItem = {
	key: string
	title: string
	href: string
}

export type Layout = 'list' | 'grid'

export type SiteConfig = {
	name: string
	tagLine: string
	description: string
	url: string
	authors: AuthorConfig[]
	socialLinks: {
		github: string
		twitter: string
		wechat: string
		email: string
	}
	creator: string
	icons: {
		icon: string
		shortcut?: string
		apple?: string
	}
}
