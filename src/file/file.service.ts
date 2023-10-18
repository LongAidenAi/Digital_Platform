import { connection } from "../app/database/msyql";
import { FileModel } from './file.model'

/**
 * 存储文件信息
 */

export const createFile = async (
    file: FileModel
) => {
    //准备查询
    const statement = `
       insert into file 
       set ?
    `

    //执行查询
    const [data] = await connection.promise().query(statement, file)

    //提供数据
    return data
}

/***
 * 按 id 查找文件
 */
export const findFileById = async (
    fileId: number
) => {
    const statement = `
        select * from file
        where id = ?
    `

    const [data] = await connection.promise().query(statement, fileId)
    console.log(data)
    return data[0]
}