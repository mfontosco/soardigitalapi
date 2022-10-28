import express from 'express'
import {followUser,unfollowUser} from '../controllers/FollowerController'
const router = express.Router()

router.route("/followuser/:id").post(followUser)
router.route("/unfollowuser/:id").post(unfollowUser)

export default router