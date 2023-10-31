import dotenv from 'dotenv'

dotenv.config()

/**
 * 应用配置
 * 这里从环境变量process.env取到AP_PORT,而这个APP_PORT是在.env中配置好了的
 * dotenv 是一个零依赖模块，它将环境变量从 .env 文件加载到 process.env 中。
 */

export const { APP_PORT } = process.env

/**
 * 数据仓库配置
 */
export const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = process.env

/**
 * 密钥配置
 */
export let { PRIVATE_KEY,PUBLIC_KEY } = process.env
PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString()
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString()

/**
 * 内容分页
 */
export const {POSTS_PER_PAGE} = process.env