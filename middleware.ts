import { routing } from '@/i18n/routing'
import { signToken, verifyToken } from '@/lib/auth/session'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = '/dashboard'

export default createMiddleware(routing)

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const sessionCookie = request.cookies.get('session')
	const isProtectedRoute = pathname.startsWith(protectedRoutes)

	if (isProtectedRoute && !sessionCookie) {
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	const res = NextResponse.next()

	if (sessionCookie && request.method === 'GET') {
		try {
			const parsed = await verifyToken(sessionCookie.value)
			const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)

			res.cookies.set({
				name: 'session',
				value: await signToken({
					...parsed,
					expires: expiresInOneDay.toISOString()
				}),
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				expires: expiresInOneDay
			})
		} catch (error) {
			console.error('Error updating session:', error)
			res.cookies.delete('session')
			if (isProtectedRoute) {
				return NextResponse.redirect(new URL('/sign-in', request.url))
			}
		}
	}

	return res
}

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		'/',
		// Set a cookie to remember the previous locale for
		// all requests that have a locale prefix
		'/(en/zh)/:path*',
		// Enable redirects that add missing locales
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
}
