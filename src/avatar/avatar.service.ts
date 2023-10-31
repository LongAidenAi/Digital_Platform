import { connection } from '../app/database/mysql'
import { AvatarModel } from './avatar.model'

/**
 * 保存头像文件信息
 */
export const createAvatar = async (avatar: AvatarModel) => {
    const statement = `
     insert into avatar
     set ? 
    `

    const [data] = await connection.promise().query(statement, avatar)

    return data
}