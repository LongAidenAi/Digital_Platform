import { Request,Response, NextFunction } from "express";
import { signToken } from "./auth.service";


/**
 * 用户登录
 */
export const login = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //准备数据
    const { user: {id, name}} = request.body;

    //通过用户登录中间件验证通过之后，会生成jwt，首先是payload
    const payload = {id, name}
   
    try {
        //签发令牌
        const token = signToken({payload})

        //做出响应
        response.send({id, name, token})
    } catch (error) {
        next(error)
    }
}

/**
 * 验证登录
 */
export const validate = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(request.user)
    response.sendStatus(200)
}