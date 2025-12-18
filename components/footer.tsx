'use client'

import { IconBrandGithub, IconBrandInstagram, IconBrandWechat, IconBrandX } from '@tabler/icons-react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { siteConfig } from '@/configs/site'

export function Footer({ brand }: { brand: string }) {
	const { socialLinks } = siteConfig
	return (
		<div className='text-sm text-neutral-500 p-4'>
			<div className='mx-auto max-w-7xl flex sm:flex-row flex-col-reverse justify-between items-center'>
				<span>
					© {new Date().getFullYear()} {brand}
				</span>
				<div className='flex gap-4 mb-8 sm:mb-0'>
					<Link href={socialLinks.twitter}>
						<IconBrandX strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Tooltip>
						<TooltipTrigger asChild>
							<IconBrandWechat strokeWidth={1} className='h-5 w-5' />
						</TooltipTrigger>
						<TooltipContent side='top'>
							<Image src={socialLinks.wechat} alt='微信二维码' width={120} height={120} className='rounded' />
						</TooltipContent>
					</Tooltip>

					<Link href={socialLinks.github}>
						<IconBrandGithub strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href={socialLinks.instagram}>
						<IconBrandInstagram strokeWidth={1} className='h-5 w-5' />
					</Link>
				</div>
				<span className='hidden sm:block'>道 · 法 · 术 · 器 · 相</span>
			</div>
		</div>
	)
}
