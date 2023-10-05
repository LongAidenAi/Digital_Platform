import express from 'express';
import { Request, Response } from 'express';
/**
 * 这个是node.js导入模块的方法，
 * 而因为早期javascript是没有自己的模块导入的
 * 但后面javascript增加了自己的标准模块导入方式
 * 但由于历史原因node.js到现在也没有采用
 * 所以如果要用ts来编译，就需要安装node.js的模块导入
 * npm install @types/node --save-dev 作为开发依赖
 * 而直接采用上面的import这样javascript的标准写法，ts是可以直接编译的
 */
// const express = require('express'); 

const app = express();
const port = 5000;

/**
 * 使用 JSON 中间件
 */
app.use(express.json())

app.listen(port, () => {
    console.log("服务已启动")
})

const data = [
    {
        id:1,
        title: "明月",
        content: "明月出天山，苍茫云海阁"
    },
    {
        id:2,
        title: "望岳",
        content: "会当凌绝顶，一览众山小"
    },    
    {
        id:3,
        title: "忆江南",
        content: "日出江花红胜火，春来江水绿如蓝"
    }
]

app.get("/posts", (request: Request, response: Response) => {
    response.send(data);
});

app.get("/posts/:postId", (request: Request, response: Response) => {
    //获取内容 ID
    const { postId } = request.params;

    //查找具体内容
    const posts = data.filter(item => item.id == postId);

    //做出响应
    response.send(posts[0]);
})

/**
 * 创建内容
 */
app.post("/posts", (request: Request, response: Response) => {
    //获取请求中的数据
    const { content } = request.body;

    //设置响应状态码
    response.status(201);

    //输出请求头部数据
    console.log(request.headers)

    //设置响应头部数据
    response.set("res-back", "I am from server")

    //做出响应
    response.send({
        message: `成创建了内容：${content}`
    })
})
