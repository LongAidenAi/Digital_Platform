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

/**
 * 删除内容
 */
export const deletePost = async (postId: number) => {
    const statement = `
        delete from post
        where id = ?
    `
    const [ data ] = await connection.promise().query(statement, postId)
    
    return data
}

/***
 * 保存内容标签
 */
export const createPostTag = async (
    postId: number, tagId: number   
) => {
    const statement = `
      insert into post_tag(postId, tagId)
      values(?,?)
    `

    const [data] = await connection.promise().query(statement,[postId, tagId])

    return data;
}

/***
 * 检查内容标签
 */
export const postHashTag = async (
  postId: number, tagId: number
) => {
    const statement = `
      select * from post_tag
      where postId=? and tagId=?
    `

    const [data] = await connection.promise().query(statement, [postId,tagId])

    return data[0] ? true : false;
}