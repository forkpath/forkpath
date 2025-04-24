import type { SiteConfig } from '@/types/config'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://forkpath.com'

const TWITTER_URL = 'https://x.com/_forkpath_'
const WECHAT_URL = 'https://bsky.app/profile/judewei.bsky.social'
const EMAIL_URL = 'mailto:forkpath@gmail.com'
const GITHUB_URL = 'https://github.com/forkpath'

export const siteConfig: SiteConfig = {
	name: 'Next Forge',
	tagLine: 'Multilingual Next.js 15 Starter',
	description:
		'A multilingual Next.js 15 starter with built-in i18n support. Launch your global-ready web application with a clean, efficient, and SEO-friendly foundation.',
	url: BASE_URL,
	authors: [
		{
			name: 'weijunext',
			url: 'https://weijunext.com'
		}
	],
	creator: '@weijunext',
	socialLinks: {
		wechat: WECHAT_URL,
		twitter: TWITTER_URL,
		email: EMAIL_URL,
		github: GITHUB_URL
	},
	themeColors: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	],
	defaultNextTheme: 'system', // next-theme option: system | dark | light
	icons: {
		icon: '/favicon.ico',
		shortcut: '/logo.png',
		apple: '/logo.png' // apple-touch-icon.png
	}
}
