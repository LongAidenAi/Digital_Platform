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
interface GetUserDptions {
  password?: boolean
}

export const getUserByName = async (name: string, options: GetUserDptions = {}) => {
  //准备选项
  const {password} = options
  
  const statement = `
      select 
      id, 
      name
      ${password ? ',password': ''} 
      from user 
      where name = ?
    `
    const [data] = await connection.promise().query(statement, name)
    //提供数据
    return data[0]
}

