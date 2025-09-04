import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function truncate(str: string | undefined, length: number) {
	return str ? (str.length > length ? `${str.substring(0, length)}...` : str) : ''
}

export function formatDate(iso: Date, locale: string) {
	const date = new Date(iso)
	let result = `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
	if (locale === 'en') {
		result = date.toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}
	return result
}
