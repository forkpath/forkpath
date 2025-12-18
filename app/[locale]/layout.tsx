import type React from 'react'

import '@/app/globals.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ViewTransitions } from 'next-view-transitions'
import { StrictMode } from 'react'
import { Toaster } from 'sonner'
import { Footer } from '@/components/footer'
import PlausibleAnalytics from '@/components/tools/plausible'
import { TailwindIndicator } from '@/components/tools/tailwind-indicator'
import { siteConfig } from '@/configs/site'
import { DEFAULT_LOCALE, routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Params = { locale: string }

type MetadataProps = {
	params: Promise<Params>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale })

	const title = `${t('navs.home.title')} | ${t('navs.home.description')}`
	const description = t('home.subTitle')
	const siteName = `${t('navs.home.title')} - ${t('navs.home.description')}`
	const url = locale === DEFAULT_LOCALE ? siteConfig.url : `${siteConfig.url}/${locale}`
	const ogImageUrl = `${siteConfig.url}/api/og?type=home&locale=${encodeURIComponent(locale)}`

	return {
		title,
		description,
		authors: siteConfig.authors,
		creator: siteConfig.creator,
		metadataBase: new URL(siteConfig.url),
		icons: {
			icon: '/favicon.ico',
			shortcut: '/icons/favicon-16x16.png',
			apple: '/icons/apple-touch-icon.png'
		},
		manifest: '/site.webmanifest',
		openGraph: {
			locale,
			type: 'website',
			title,
			description,
			url,
			siteName,
			images: [{ url: ogImageUrl, alt: title }]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImageUrl],
			creator: siteConfig.creator
		}
	}
}

export default async function RootLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: Promise<Params>
}>) {
	const { locale } = await params
	const t = await getTranslations()
	const brand = t('author.name')

	// 确保传入的“语言环境”有效
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// 客户端提供所有翻译文件
	const messages = await getMessages()

	return (
		<StrictMode>
			<ViewTransitions>
				<html lang={locale || DEFAULT_LOCALE} suppressHydrationWarning>
					<body className={cn('bg-neutral-50 text-neutral-800 antialiased font-misans')}>
						<NextIntlClientProvider messages={messages}>
							<Toaster position='bottom-right' />
							<div
								className='min-h-screen inset-0 -z-10 opacity-90 flex flex-col'
								style={{
									backgroundImage:
										'linear-gradient(0deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02)), repeating-linear-gradient(90deg, transparent 0 119px, rgba(0,0,0,0.03) 119px 120px)'
								}}
							>
								<div className='flex-1'>{children}</div>
								<Footer brand={brand} />
							</div>
						</NextIntlClientProvider>
						<TailwindIndicator />
						{process.env.NODE_ENV === 'production' && <PlausibleAnalytics />}
					</body>
				</html>
			</ViewTransitions>
		</StrictMode>
	)
}
