import { GetPostsOptionsFilter } from "src/post/post.service"
import { connection } from "../app/database/mysql"
import { CommentModel } from "./comment.model"
import { sqlFragment } from "./comment.provider"
import { fileFilter } from "src/file/file.middleware"

/***
 * 创建评论
 */
export const createComment = async (
    comment: CommentModel
) => {
    const statement = `
      insert into comment 
      set ?
    `

    const [data] = await connection.promise().query(statement, comment)

    return data
}

/***
 * 检查评论是否为回复评论 
 */
export const isReplyComment = async (
  commentId: number 
) => {
    const statement = `
     select parentId from comment
     where id = ?
    `

    const [data] = await connection.promise().query(statement,commentId)

    return data[0].parentId ? true : false
}

 /***
  * 修改评论
  */
 export const updateComment = async (
   comment: CommentModel
 ) => {
   const {id, content} = comment
   
   const statement = `
     update comment
     set content = ?
     where id = ?
   `

  const [data] = await connection.promise().query(statement, [content, id])

  return data
 }

 /***
  * 删除评论
  */
 export const deleteComment = async (
  commentId: number
 ) => {
     const statement = `
       delete from comment
       where id = ?
     `

     const [data] = await connection.promise().query(statement, commentId)

     return data
 }

/***
 * 获取评论列表
 */
export interface GetCommentOptions {
  commentFilter?: GetPostsOptionsFilter
}

export const getComments = async (
  options: GetCommentOptions
) => {
    const {commentFilter} = options;

    let params: Array<any> = []

    if(commentFilter.param) {
      params = [commentFilter.param, ... params]
    }

    const statement = `
     select
      comment.id,
      comment.content,
      ${sqlFragment.user},
      ${sqlFragment.post}
      ${commentFilter.name == 'userReplied' ? `, ${sqlFragment.repliedComment}` : ''}
      ${commentFilter.name !== 'userReplied' ? `, ${sqlFragment.totalReplis}` : ''}
      from 
       comment
      ${sqlFragment.leftJoinUser}
      ${sqlFragment.leftJoinPost}
      where 
       ${commentFilter.sql}
      group by 
       comment.id
      order by 
       comment.id desc
    `

    const [data] = await connection.promise().query(statement, params)

    return data
}