import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale

	if (locale?.startsWith('en')) {
		locale = 'en'
	} else {
		locale = 'zh'
	}

	// Ensure that a valid locale is used
	if (!locale || !routing.locales.includes(locale as any)) {
		return {
			locale: routing.defaultLocale,
			messages: (await import(`./locales/${routing.defaultLocale}.json`)).default
		}
	}

	return {
		locale,
		messages: (await import(`./locales/${locale}.json`)).default
	}
})
