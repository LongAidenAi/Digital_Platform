import {connection} from "../app/database/mysql"
import { UserModel } from "./user.model" 

/**
 * 创建用户
 */
export const createUser = async (user: UserModel) => {
    const statement = `
      insert into user 
      set ?
    `

    const [ data ] = await connection.promise().query(statement, user)

    return data
}

/**
 * 获取用户
 */
interface GetUserOptions {
  password?: boolean
}

export const getUser = (condition: string) => {
   return async (param: string | number, options: GetUserOptions = {}) => {
    const {password} = options

    const statement = `
      select
        user.id,
        user.name,
        if (
          count(avatar.id), 1, null
        ) as avatar
        ${password ? ', password': ''}
      from
       user
      left join avatar
       on avatar.userId = user.id
      where 
       ${condition} = ?
    `

   const [data] = await connection.promise().query(statement, param)

   return data[0].id ? data[0] : null
   }
}

/**
 * 按用户名获取用户
 */
export const getUserByName = getUser('user.name')

/**
 * 按用户 ID 获取用户
 */
export const getUserById = getUser('user.id')


/***
 * 更新用户
 */
export const updateUser = async (
  userId: number, userData: UserModel
) => {
    const statement = `
      update user
      set ?
      where user.id = ?
    `
    console.log(userData)
    const params = [userData, userId]

    const [data] = await connection.promise().query(statement, params)

    return data
}