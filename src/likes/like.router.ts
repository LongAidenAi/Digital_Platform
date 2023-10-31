import express from 'express'
import * as LikeController from './like.controller'
import { authGuard } from '../auth/auth.middleware'

const router = express.Router()

/**
 * 点赞内容
 */
router.post('/posts/:postId/like', authGuard, LikeController.storeUserLikePost)


export default router