import { connection } from "../app/database/msyql"



/**
 * 获取内容列表 
 */
export const getPosts = async () => {
    const statement = `
      select 
        post.id,
        post.title,
        post.content,
        JSON_OBJECT(
            'id', user.id,
            'name', user.name
        ) as user
      from post
      left join user
        on user.id = post.userId
    `
    const [ data ] = await connection.promise().query(statement)
    return data
}