import {Request, Response, NextFunction} from 'express'
import {POSTS_PER_PAGE} from '../app/app.config'

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

/***
 * 过滤列表
 */
export const filter = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //结果后查询符
    const {tag, user, action} = request.query;

    //设置默认的过滤
    request.postFilter = {
        name: 'default',
        sql: 'post.id is not null'
    }

    //按标签名过滤
    if(tag && !user && !action) {
        request.postFilter = {
            name: 'tagName',
            sql: 'tag.name = ?',
            param: String(tag)
        }
    }
    //过滤出用户发布的内容
    if(user && action == 'published' && !tag) {

        request.postFilter = {
            name: 'userPublished',
            sql: 'user.id = ?',
            param: String(user)
        }
    }

    next()
}

/***
 * 内容分页
 */
export const paginate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //当前页码
    const {page = 1} = request.query
    console.log(POSTS_PER_PAGE)
    //每页内容数量
    const limit = parseInt(POSTS_PER_PAGE, 10) || 30;
    //计算出偏移量
    const offset = limit * ( Number(page) - 1 )

    //设置请求中的分页
    request.pagination = { limit, offset}

    next()
}