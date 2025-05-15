import { truncate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'

export const BlogPin = ({ blog }: { blog: BlogPost | null }) => {
	return (
		blog && (
			<Link
				className='grid grid-cols-1 md:grid-cols-2  rounded-3xl group/blog border border-transparent shadow-xl shadow-accent-foreground dark:hover:border-neutral-800 w-full dark:hover:bg-neutral-900 hover:border-neutral-200 hover:bg-neutral-100  overflow-hidden  hover:scale-[1.02]'
				href={`/blog/${blog.slug}`}
			>
				<Image
					src={blog.image || ''}
					alt={blog.title}
					height='800'
					width='800'
					className='h-full max-h-96 object-cover object-top w-full rounded-3xl'
				/>
				<div className='p-4 md:p-8 dark:group-hover/blog:bg-neutral-900 group-hover/blog:bg-neutral-100 flex flex-col justify-between'>
					<div>
						<p className='text-lg md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100'>{blog.title}</p>
						<p className='text-left text-base md:text-xl mt-2 text-neutral-600 dark:text-neutral-400'>
							{truncate(blog.description, 500)}
						</p>
					</div>
					<p className='text-neutral-600 dark:text-neutral-300 text-sm  max-w-xl  transition duration-200'>
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
