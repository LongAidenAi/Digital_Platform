import { Request,Response, NextFunction } from "express";

/***
 * 过滤器
 */
export const commentFilter = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const {post, user, action} = request.query

    /**
     * 这里的postFilter其实是用来过滤comment的，但因为filter和原生属性重名，所以定义为postFilter
     */
    request.postFilter = {
        name: 'default',
        sql: 'comment.parentId IS NULL'
    }

    //内容的评论
    if( post && !user && !action) {
        request.postFilter = {
            name: 'postComments',
            sql: 'comment.parentId IS NULL AND comment.postId = ?',
            param: String(post)
        }
    }

    //用户的评论
    if(user && action == 'published' && !post) {
        request.postFilter = {
            name: 'userPublished',
            sql: 'comment.parentId IS NULL AND comment.userId = ?',
            param: String(user)
        }
    }

    //用户的回复
    if(user && action == 'replied' && !post) {
        request.postFilter = {
            name: 'userReplied',
            sql: 'comment.parentId IS NULL AND comment.userId = ?',
            param: String(user)
        }
    }

    next()
}