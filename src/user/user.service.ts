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