import Image from 'next/image'
import Link from 'next/link'
import { truncate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

export const BlogPin = ({ blog }: { blog: BlogPost | null }) => {
	return (
		blog && (
			<Link
				className='grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-transparent shadow-xl group/blog shadow-accent-foreground hover:scale-[1.02] hover:border-neutral-200 hover:bg-neutral-100 md:grid-cols-2 dark:hover:border-neutral-800 dark:hover:bg-neutral-900'
				href={`/blog/${blog.slug}`}
			>
				<Image
					src={blog.image || ''}
					alt={blog.title}
					height='800'
					width='800'
					className='h-full w-full max-h-96  rounded-3xl object-cover object-top'
				/>
				<div className='flex flex-col justify-between group-hover/blog:bg-neutral-100 p-4 dark:group-hover/blog:bg-neutral-900 md:p-8'>
					<div>
						<p className='mb-4 text-lg font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl'>{blog.title}</p>
						<p className='mt-2 text-left text-base text-neutral-600 dark:text-neutral-400 md:text-xl'>
							{truncate(blog.description, 500)}
						</p>
					</div>
					<p className='max-w-xl text-sm text-neutral-600 transition duration-200 dark:text-neutral-300'>
						{new Date(blog.date || '').toLocaleDateString('en-us', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</p>
				</div>
			</Link>
		)
	)
}
