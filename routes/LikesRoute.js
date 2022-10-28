import express from 'express'
import { likePost,unlikePost } from '../controllers/LikesController.js'
const router = express.Router()


router.route("/like/:id").post(likePost)
router.route("/unlike").post(unlikePost)
export default router