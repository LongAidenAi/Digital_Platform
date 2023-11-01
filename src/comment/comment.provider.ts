/**
 * sql 查询片断
 */
export const sqlFragment = {
    leftJoinUser: `
        left join user
         on user.id = comment.userId
        left join avatar
         on user.id = avatar.userId
    `,
    user: `
     json_object(
        'id',user.id,
        'name',user.name,
        'avatar', if(count(avatar.id),1,null)
     ) as user
    `,
    leftJoinPost: `
     left join post
      on post.id = comment.postId
    `,
    post: `
     json_object(
        'id',post.id,
        'title',post.title
     ) as post
    `,
    repliedComment: `
     (
       select
         json_object(
            'id', repliedComment.id,
            'content', repliedComment.content
         )
      from 
         comment repliedComment
      where comment.parentId = repliedComment.id
     ) as repliedComment
    `,
    totalReplis: `
     (
      select 
         count(reply.id)
      from 
         comment reply
      where 
         reply.parentId = comment.id
     ) as totalReplies
    `       
}