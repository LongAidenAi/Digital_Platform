import { connection } from "../app/database/mysql";

/***
 * 保存用户点赞内容
 */
export const createUserLikePost = async (
    userId: number,
    postId: number
) => {
    const statement = `
     insert into
      user_like_post (userId, postId)
     values (?,?)
    `

    const [data] = await connection.promise().query(statement, [userId, postId])

    return data
}