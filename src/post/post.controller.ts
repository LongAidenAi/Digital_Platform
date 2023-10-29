import { Request,Response, NextFunction } from "express";
import _ from "lodash"
import { 
    getPosts,
    createPost,
    updatePost, 
    deletePost, 
    createPostTag, 
    postHashTag,
    deletePostTag } from "./post.service";
import { TagModel } from "../tag/tag.model";
import { getTagByName, createTag } from "../tag/tag.service";

/**
 * 内容列表
 */

export const index = async(
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const posts = await getPosts({sort: request.sort})
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
    const { id: userId } = request.user;

    //创建内容
    try {
        const data = await createPost({title,content, userId})
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

/**
 * 删除内容
 */
export const destroy = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const {postId} = request.params

    try {
        const data = await deletePost(parseInt(postId, 10))
        response.status(201).send(data)
    } catch (error) {
        next(error)
    }


}

/***
 * 添加内容标签
 */
export const storePostTag = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const {postId} = request.params
    const {name} = request.body

    let tag: TagModel;

    //在数据库查找是否有这个标签
    try {
        tag = await getTagByName(name)
        console.log(tag)
    } catch (error) {
        return next(error)
    }

    //如果找到了这个标签, 判断这个标签是不是之前已经贴到了这个帖子上
    if(tag) {
        try {
            const postTag = await postHashTag(parseInt(postId, 10),tag.id)
            if(postTag) return next(new Error('POST_ALREADY_HAS_THIS_TAG'))
        } catch (error) {
            return next(error)
        }
    }

    //如果在数据库没有找到给内容贴上的这个标签，则去创建这个标签
    if(!tag) {
        try {
            const data = await createTag({name})
            tag = {id: data.insertId}
        } catch (error) {
            return next(error)
        }
    }

    //给内容打上标签
    try {
        await createPostTag(parseInt(postId, 10), tag.id)
        response.sendStatus(201)
    } catch (error) {
        return next(error)
    }
}

/***
 * 删除内容标签
 */
export const destroyPostTag = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const {postId} = request.params
    const {tagId} = request.body

    //移除内容标签
    try {
        await deletePostTag(parseInt(postId, 10), tagId)
        response.sendStatus(200)
    } catch (error) {
        next(error)
    }
}