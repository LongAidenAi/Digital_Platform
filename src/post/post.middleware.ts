import {Request, Response, NextFunction} from 'express'

/***
 * 排序方式
 */
export const sort = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //获取客户端的排序方式
    const {sort} = request.query

    //排序用的SQL
    let sqlSort: string;

    //设置排序用的SQL
    switch (sort) {
        case 'earliest':
            sqlSort = 'post.id asc'
            break;
        case 'latest':
            sqlSort = 'post.id desc'
            break;
        case 'most_comments':
            sqlSort = 'totalComments desc , post.id desc'
            break;   
        default:
            sqlSort = 'post.id desc'
            break;
    }

    //在请求中添加排序
    request.sort = sqlSort

    next()
}