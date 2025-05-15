'use client'
import { truncate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'
import FuzzySearch from 'fuzzy-search'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const BlogList = ({ blogs }: { blogs: BlogPost[] }) => {
	const [search, setSearch] = useState('')
	const searcher = new FuzzySearch(blogs, ['title', 'description'], { caseSensitive: false })
	const [results, setResults] = useState(blogs)

	useEffect(() => {
		const results = searcher.search(search)
		setResults(results)
	}, [search])
	return (
		<div className='w-full py-20'>
			<div className='flex sm:flex-row flex-col justify-between gap-4 items-center mb-10'>
				<p className='text-2xl font-bold text-neutral-800 dark:text-white'>More Posts</p>
				<input
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search blogs'
					className='text-sm max-w-xl w-full sm:min-w-96 border dark:border-transparent border-neutral-200 p-2 rounded-md dark:bg-neutral-800 bg-white shadow-sm focus:border-neutral-200 focus:ring-0 focus:outline-none outline-none text-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-400 placeholder:neutral-700'
				/>
			</div>

			<div className='divide-y dark:divide-neutral-800 divide-neutral-200'>
				{results.length === 0 ? (
					<p className='text-neutral-400 text-center p-4'>No results found</p>
				) : (
					results.map((blog, id) => (
						<motion.div
							key={`${blog.title}_${id}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.05 * id }}
						>
							<Link
								key={blog.slug}
								href={`/blog/${blog.slug}`}
								className='flex md:flex-row flex-col items-start justify-between md:items-center group/blog-row py-4'
							>
								<div>
									<h2 className='text-neutral-700 text-lg font-bold tracking-tight'>{blog.title}</h2>
									<p className='text-neutral-500 text-sm '>{truncate(blog.description || '', 150)}</p>

									<div className='flex gap-2 items-center my-4'>
										<p className='dark:text-neutral-300 text-neutral-500 text-sm  max-w-xl'>
											{new Date(blog.date || '').toLocaleDateString('en-us', {
												weekday: 'long',
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})}
										</p>
									</div>
								</div>
								<Image
									src={blog.image}
									alt={blog.title}
									width={100}
									height={100}
									className='hidden md:block w-32 h-32 rounded-md object-cover'
								/>
							</Link>
						</motion.div>
					))
				)}
			</div>
		</div>
	)
}
