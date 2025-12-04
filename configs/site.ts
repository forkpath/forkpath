import type { SiteConfig } from '@/types/config'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://forkpath.com'

const TWITTER_URL = 'https://x.com/_forkpath_'
const WECHAT_URL = 'https://wechat.com/forkapth_avatar'
const EMAIL_URL = 'mailto:forkpath@gmail.com'
const GITHUB_URL = 'https://github.com/forkpath'
const INSTAGRAM_URL = 'https://instagram.com/forkpath'

export const siteConfig: SiteConfig = {
	name: '道法术器相',
	description: 'Observe:观察/Think:思考/Practice:实践/Record:记录/Correct:纠错/Iterate:迭代',
	url: BASE_URL,
	authors: [
		{
			name: 'forkpath',
			url: 'https://forkpath.com'
		}
	],
	creator: 'forkpath',
	socialLinks: {
		wechat: WECHAT_URL,
		twitter: TWITTER_URL,
		email: EMAIL_URL,
		github: GITHUB_URL,
		instagram: INSTAGRAM_URL
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/logo.png',
		apple: '/logo.png' // apple-touch-icon.png
	}
}
