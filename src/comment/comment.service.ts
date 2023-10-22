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