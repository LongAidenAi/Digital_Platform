import { connection } from "../app/database/msyql"
import { PostModel } from "./post.model"
import { sqlFragment } from "./post.provider"



/**
 * 获取内容列表 
 */
export interface GetPostsOptionsFilter {
  name: string;
  sql?: string;
  param?: string;
}

interface GetPostsOptions {
  sort?: string;
  postFilter?: GetPostsOptionsFilter
}
 
export const getPosts = async (options: GetPostsOptions) => {
    const {sort, postFilter} = options

    //sql 参数
    let params: Array<any> = []

    //设置 sql 参数
    if(postFilter.param) {
      params = [postFilter.param, ...params]
    }

    const statement = `
      select 
        post.id,
        post.title,
        post.content,
        ${sqlFragment.user},
        ${sqlFragment.totalComments},
        ${sqlFragment.file},
        ${sqlFragment.tag}
      from post
        ${sqlFragment.leftJoinUser}
        ${sqlFragment.leftJoinOneFile}
        ${sqlFragment.leftJoinTag}
      where ${postFilter.sql}
      group by post.id
      order by ${sort}
    `
    const [ data ] = await connection.promise().query(statement, params)
    console.log(postFilter.sql)
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

/***
 * 移除内容标签
 */
export const deletePostTag = async (
  postId: number, tagId:number
) => {
    const statement = `
     delete from post_tag
     where postId = ? and tagId = ?
    `

    const [data] = await connection.promise().query(statement, [postId, tagId])

    return data
}