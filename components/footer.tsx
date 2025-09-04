import { IconBrandGithub, IconBrandInstagram, IconBrandWechat, IconBrandX } from '@tabler/icons-react'
import { Link } from 'next-view-transitions'

export function Footer({ brand }: { brand: string }) {
	return (
		<div className='text-sm text-neutral-500 p-4'>
			<div className='mx-auto max-w-7xl flex sm:flex-row flex-col-reverse justify-between items-center'>
				<span>
					© {new Date().getFullYear()} {brand}
				</span>
				<div className='flex gap-4 mb-8 sm:mb-0'>
					<Link href='#'>
						<IconBrandX strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href='#'>
						<IconBrandWechat strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href='#'>
						<IconBrandGithub strokeWidth={1} className='h-5 w-5' />
					</Link>

					<Link href='#'>
						<IconBrandInstagram strokeWidth={1} className='h-5 w-5' />
					</Link>
				</div>
				<span className='hidden sm:block'>道 · 法 · 术 · 器 · 相</span>
			</div>
		</div>
	)
}
