import { IconBrandGithub, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react'
import { Link } from 'next-view-transitions'
import { Container } from './container'

export function Footer() {
	return (
		<Container className='w-full relative border-accent-100 dark:border-white/[0.1] overflow-hidden'>
			<div className='border-t  max-w-7xl mx-auto text-sm text-neutral-500  justify-between items-start p-4'>
				<div className='flex sm:flex-row flex-col justify-between items-center w-full'>
					<p className='text-neutral-500 dark:text-neutral-400 mb-8 sm:mb-0'>&copy; Forkpath</p>
					<div className='flex gap-4'>
						<Link href='#'>
							<IconBrandTwitter className='h-6 w-6 text-neutral-500 dark:text-neutral-300' />
						</Link>

						<Link href='#'>
							<IconBrandGithub className='h-6 w-6 text-neutral-500 dark:text-neutral-300' />
						</Link>
						<Link href='#'>
							<IconBrandInstagram className='h-6 w-6 text-neutral-500 dark:text-neutral-300' />
						</Link>
					</div>
				</div>
			</div>
		</Container>
	)
}
