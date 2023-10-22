import { connection } from "../app/database/msyql"
import { CommentModel } from "./comment.model"

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