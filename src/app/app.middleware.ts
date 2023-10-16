import {Request, Response, NextFunction} from 'express'

/**
 * 输出请求地址
 */
export const requestUrl = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(request.url)
    next()
}

/**
 * 默认异常处理器
 * 一个中间件函数可以被认为是错误处理中间件的条件是它具有四个参数，
 * 即(error, request, response, next)。
 * 这是一个约定，用于标识一个函数是错误处理中间件。
 * 在你的代码中，defaultErrorHandler函数满足这个条件，
 * 因为它接受四个参数：error, request, response, next。
 * 这表明它被设计为一个错误处理中间件。
 * 
 *   注意：
 * 当Express处理请求时，它会按顺序调用已注册的中间件函数。
 * 对于错误处理中间件，它们通常是最后一个注册的中间件，
 * 以确保它们能够捕获所有其他中间件中发生的错误。
 */
export const defaultErrorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if(error.message) {
        console.log("⚠️", error.message)
    }
    let statusCode: number, message: string;

    /**
     * 处理异常
     */
    switch (error.message) {
        case 'NAME_IS_REQUIRED':
            statusCode = 400
            message = '请提供用户名'
            break;
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 400
            message = '请提供用户密码'
            break;
        case 'USER_ALREADY_EXIST':
            statusCode = 400
            message = '用户名已被占用'
            break;   
        case 'USER_DOES_NOT_EXIST':
            statusCode = 400
            message = '用户名不存在'
            break; 
        case 'PASSWORD_DOES_NOT_MATCH':
            statusCode = 400
            message = '密码不正确'
            break; 
        case 'UNAUTHORIZED':
            statusCode = 401
            message = '请先登录'
            break; 
        default:
            statusCode = 500;
            message = "服务器出现了一点问题"
            break
    }

    response.status(statusCode).send({ message })
}