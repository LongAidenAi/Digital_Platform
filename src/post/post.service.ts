import { connection } from "../app/database/msyql"
import { PostModel } from "./model"



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

/**
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
    //准备sql
    const statement = `
        insert into post 
        set ?
    `;

    //执行sql
    const [data] = await connection.promise().query(statement, post)

    //提供数据
    return data;
}

/**
 * 更新内容
 */
export const updatePost = async (postId: number, post: PostModel) => {
    const statement = `
        update post
        set ? 
        where id = ? 
    `

    const [ data ] = await connection.promise().query(statement, [post, postId])

    return data
}