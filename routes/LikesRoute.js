import express from 'express'
import { createLikes } from '../controllers/LikesController.js'
const router = express.Router()


router.route("/:id").post(createLikes)

export default router