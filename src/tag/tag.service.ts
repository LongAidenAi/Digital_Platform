import {connection} from '../app/database/msyql'
import {TagModel}  from './tag.model'

/***
 * 创建标题
 */
export const createTag = async (
    tag: TagModel
) => {
    const statement = `
      insert into tag
      set ? 
    `
    const [data] = await connection.promise().query(statement, tag)

    return data as any
}

/***
 * 按名字查找标签
 */
export const getTagByName = async (
    tagName: string
) => {
    const statement = `
      select id, name from tag 
      where name = ?
    `

    const [data] = await connection.promise().query(statement, tagName)

    return data[0]
}