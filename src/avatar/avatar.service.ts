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

/***
 * 按用户 ID 查找 头像
 */
export const findAvatarByUserId = async (
    userId: number
) => {
    const statement = `
     select *
     from avatar
     where userId = ?
     order by avatar.id desc
     limit 1
    `
    const [data] = await connection.promise().query(statement, userId)
    
    return data[0]
}