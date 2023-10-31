import express from 'express'
import * as avatarController from './avatar.controller'
import {authGuard} from '../auth/auth.middleware'
import { avatarInterceptor,avatarProcessor } from './avatar.middleware'


const router = express.Router()

/**
 * 上传文件
 */
router.post('/avatar', 
    authGuard, 
    avatarInterceptor, 
    avatarProcessor, 
    avatarController.store
    )

/**
 * 导出路由
 */
router.get('/users/:userId/avatar', avatarController.serve)


export default router