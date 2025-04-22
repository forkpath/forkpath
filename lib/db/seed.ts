import { hashPassword } from '@/lib/auth/session'
import * as dotenv from 'dotenv'
import { db } from './drizzle'
import { users } from './schema'

dotenv.config()

async function seed() {
	const email = process.env.DEFAULT_USER!
	const plainPassword = process.env.DEFAULT_USER_PASSWORD!
	const password = await hashPassword(plainPassword)

	const [user] = await db
		.insert(users)
		.values([
			{
				email,
				password
			}
		])
		.returning()

	console.log('创建默认用户完成')
}

seed()
	.catch((error) => {
		console.error('初始化数据库数据失败', error)
		process.exit(1)
	})
	.finally(() => {
		console.log(' 数据库数据初始化完成')
		process.exit(0)
	})
