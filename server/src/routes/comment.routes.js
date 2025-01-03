import express from 'express'
import { AddComment, deleteComment, getAllComment } from '../controllers/CommentController.js'
const router =express.Router()

router.route('/addcomment').post(AddComment)
router.route('/getcomment/:id').get(getAllComment)
router.route('/deletecomment/:id').post(deleteComment)

export default router