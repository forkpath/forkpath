import { siteConfig } from '@/configs/site'
import { IconBrandGithub, IconBrandInstagram, IconBrandWechat, IconBrandX } from '@tabler/icons-react'
import { Link } from 'next-view-transitions'

export function Footer({ brand }: { brand: string }) {
	const { socialLinks } = siteConfig
	return (
		<div className='text-sm text-neutral-500 p-4'>
			<div className='mx-auto max-w-7xl flex sm:flex-row flex-col-reverse justify-between items-center'>
				<span>
					© {new Date().getFullYear()} {brand}
				</span>
				<div className='flex gap-4 mb-8 sm:mb-0'>
					<Link href={socialLinks.twitter} passHref>
						<IconBrandX strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href={socialLinks.wechat} passHref>
						<IconBrandWechat strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href={socialLinks.github} passHref>
						<IconBrandGithub strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href={socialLinks.instagram} passHref>
						<IconBrandInstagram strokeWidth={1} className='h-5 w-5' />
					</Link>
				</div>
				<span className='hidden sm:block'>道 · 法 · 术 · 器 · 相</span>
			</div>
		</div>
	)
}
