'use client'
import type { Locale } from '@/i18n/routing'
import { formatDate, truncate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'
import type { Layout } from '@/types/config'
import { motion } from 'framer-motion'
import FuzzySearch from 'fuzzy-search'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const BlogList = ({
	locale,
	category,
	title,
	description,
	layout = 'list',
	placeholder = 'search',
	blogs
}: {
	locale: Locale
	category: string
	title: string
	description: string
	layout: Layout
	placeholder: string
	blogs: BlogPost[]
}) => {
	const t = useTranslations()

	const [query, setQuery] = useState('')
	const searcher = new FuzzySearch(blogs, ['title', 'description'], { caseSensitive: false })
	const [results, setResults] = useState(blogs)
	const [page, setPage] = useState(1)

	useEffect(() => {
		const results = searcher.search(query)
		setResults(results)
		setPage(1)
	}, [query])

	return (
		<div className='w-full flex flex-col'>
			<header className='mt-6 rounded-3xl border border-neutral-200 bg-white/70 p-6 md:p-10 mb-8 md:mb-10'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='text-sm tracking-widest uppercase text-neutral-500'>{category}</div>
						<span className='h-px w-10 bg-neutral-200' />
					</div>
					<span className='text-5xl md:text-6xl font-light text-neutral-200/80'>{title}</span>
				</div>
				<div className='flex items-center justify-between'>
					<div className='w-full sm:w-1/2 mt-6 flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white/60 px-3 py-1.5 shadow-sm focus-within:ring-1 focus-within:ring-neutral-400'>
						<Search className='h-4 w-4 text-neutral-400' />
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={placeholder}
							className='flex-1 bg-transparent text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none'
							aria-label={placeholder}
						/>
					</div>
					<p className='hidden sm:block mt-6 max-w-2xl text-neutral-300'>{description}</p>
				</div>
			</header>

			{/* No Results */}
			{results.length === 0 ? (
				<p className='text-neutral-400 text-center p-4'>{t('noResult')}</p>
			) : // List Layout
			layout === 'list' ? (
				results.map((blog, id) => (
					<motion.div
						key={`${blog.title}_${id}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.05 * id }}
					>
						<Link
							key={id}
							href={blog.slug}
							className='group mb-4 rounded-xl border hover:border-neutral-200 bg-white/60 p-4 transition flex md:flex-row flex-col items-start justify-between md:items-center group/blog-row py-4'
						>
							<div className='px-4'>
								<h2 className='text-neutral-700 text-lg font-bold tracking-tight'>{blog.title}</h2>
								<p className='text-neutral-500 text-sm'>{truncate(blog.description || '', 150)}</p>

								<div className='flex gap-3 items-center my-4'>
									<p className='text-neutral-500 text-sm max-w-xl'>
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
			) : (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{results.map((blog, id) => (
						// <motion.div
						// 	key={`${blog.title}_${id}`}
						// 	initial={{ opacity: 0 }}
						// 	animate={{ opacity: 1 }}
						// 	transition={{ duration: 0.3, delay: 0.05 * id }}
						// >
						<Link
							key={id}
							href={blog.slug}
							className='group mb-4 rounded-xl border hover:border-neutral-200 bg-white/60 p-4 transition flex flex-col items-start justify-between md:items-center group/blog-row py-4'
						>
							{blog.image && (
								<div className='h-36 w-full overflow-hidden'>
									<Image
										src={blog.image}
										alt={blog.title}
										width={400}
										height={300}
										className='h-full w-full object-cover group-hover:scale-[1.02] transition-transform'
									/>
								</div>
							)}
							<div className='p-5'>
								<h3 className='text-sm text-neutral-800'>{blog.title}</h3>
								<p className='mt-2 text-xs text-neutral-500'>{formatDate(blog.date, String(locale))}</p>
								<p className='mt-2 text-sm text-neutral-600 line-clamp-2'>{blog.description}</p>
								<div className='mt-3 flex items-center gap-2 text-xs'>
									<span className='h-px flex-1 bg-neutral-200' />
									{blog.tags
										?.split(',')
										.slice(0, 3)
										.map((t: string) => (
											<span key={t} className='rounded-full border px-2 py-0.5 text-neutral-500'>
												{t}
											</span>
										))}
								</div>
							</div>
						</Link>
						// </motion.div>
					))}
				</div>
			)}

			{/* Grid Layout*/}
		</div>
	)
}
