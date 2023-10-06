import dotenv from 'dotenv'

dotenv.config()

/**
 * 应用配置
 * 这里从环境变量process.env取到AP_PORT,而这个APP_PORT是在.env中配置好了的
 * dotenv 是一个零依赖模块，它将环境变量从 .env 文件加载到 process.env 中。
 */

export const { APP_PORT } = process.env
