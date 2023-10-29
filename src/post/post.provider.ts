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
    leftJoinOneFile: `
    LEFT JOIN LATERAL (
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
    `
}