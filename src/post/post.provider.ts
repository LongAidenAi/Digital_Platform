/**
 * 查询片段
 */
export const sqlFragment = {
    user: `
     JSON_OBJECT(
        'id', user.id,
        'name', user.name,
        'avatar', IF(COUNT(avatar.id), 1, null)
     ) as user
    `,
    leftJoinUser: `
     left join user
      on user.id = post.userId
     left join avatar
      on user.id = avatar.userId
    `,
    totalComments:`
     (  
	 	SELECT
	 		count(comment.id)
	 	FROM
	 		comment 
	 	where 
	 		comment.postId = post.id
	 ) as totalComments
    `,
    innerJoinOneFile: `
    INNER JOIN LATERAL (
        SELECT *
        FROM file
        WHERE file.postId = post.id
        ORDER BY file.id DESC
        LIMIT 1
    ) AS file
        ON file.postId = post.id
    `,
    file: `
     cast(
        if(
            count(file.id),
            group_concat(
                distinct json_object(
                    'id', file.id,
                    'width', file.width,
                    'height', file.height
                )
            ),
            null
        ) as json
     ) as file
    `,
    leftJoinTag: `
     left join
      post_tag on post_tag.postId = post.id
     left join
      tag on post_tag.tagId = tag.id
    `,
    tag: `
     cast(
       if(
        count(tag.id),
        concat(
            '[',
            group_concat(
                distinct json_object(
                    'id', tag.id,
                    'name', tag.name
                )
            )
            ,']'
        ), null
       ) as json
     ) as tags
    `,
    totalLikes: `
    (
        select count(user_like_post.postId)
        from user_like_post
        where user_like_post.postId = post.id
    ) as totalLikes 
    `,
    innerJoinUserLikePost: `
    inner join user_like_post
    on user_like_post.postId = post.id
    `

}