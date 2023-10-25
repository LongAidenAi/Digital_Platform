/**
 * 查询片段
 */
export const sqlFragment = {
    user: `
     JSON_OBJECT(
        'id', user.id,
        'name', user.name
     ) as user
    `,
    leftJoinUser: `
     left join user
     on user.id = post.userId
    `
}