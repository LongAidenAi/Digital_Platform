import {connection} from "../app/database/msyql"
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
 * 按用户名查找用户
 */
export const getUserByName = async (name: string) => {
    const statement = `
      select id, name 
      from user 
      where name = ?
    `

    const [ data ] = await connection.promise().query(statement, name)

    //提供数据
    return data[0]
}