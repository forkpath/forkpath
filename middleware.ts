/*
    这个 middleware 使用了 next-intl 库来处理国际化路由，具体作用如下：
    当你访问 localhost:3000 时
    Middleware 检测到这是根路径 (/)
    根据配置自动重定向到 /zh 或 /en
    Next.js 随后匹配到 app/[locale]/page.tsx
    locale 参数被设置为检测到的语言代码
    这是 next-intl 的标准行为，用于实现无缝的国际化用户体验。
 */
import { routing } from '@/i18n/routing'

import createMiddleware from 'next-intl/middleware'

export default createMiddleware(routing)

export const config = {
	matcher: [
		// 根路径重定向：当你访问 localhost:3000 时，middleware 会自动重定向到带语言环境的路径（如 /zh 或 /en）
		'/',
		// 为所有带有语言环境前缀的请求设置 cookie 来记住之前的语言环境
		// URL 中的语言前缀
		// Cookie 中保存的语言偏好
		// Accept-Language 请求头
		// 默认语言设置
		// 路径重写：所有不带语言前缀的路径都会被重写为带语言前缀的路径
		'/(en/zh)/:path*',
		// /pathname -> /zh/pathname
		'/((?!api|_next|_vercel|.*\\.|favicon.ico).*)'
	]
}
