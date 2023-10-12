import { Request,Response, NextFunction } from "express";
import { getPosts,createPost,updatePost } from "./post.service";
import _ from "lodash"

/**
 * 内容列表
 */

export const index = async(
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const posts = await getPosts()
        response.send(posts)
    } catch (error) {
        next(error)
    }
}

/***
 * 创建内容
 */
export const store = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //准备数据
    const { title, content } = request.body;

    //创建内容
    try {
        const data = await createPost({title,content})
        response.status(201).send(data)
    } catch (error) {
        next(error)
    }
}

/**
 * 更新内容
 */
export const update = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //获取内容ID
    const {postId} = request.params;

    //准备数据
    /**
     * 如果使用const {title, content} = request.body
     * 如果没有在客户端传入title，或者content，则会报错
     * 是因为如果没有title, 就是{"title": null, "content": "有内容"}
     * 那么在service层中，执行sql语句就成了update post set "title" = null, "content": "有内容" where id = xx
     * 在数据库中设置的是，不允许title字段为空的，所以会报错
     */
    const post = _.pick(request.body, ['title', 'content'])

    //更新内容
    try {
        const data = await updatePost(parseInt(postId, 10), post)
        response.status(201).send(data)
    } catch (error) {
        next(error)
    }
}
