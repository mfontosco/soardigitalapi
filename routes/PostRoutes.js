import express from 'express'
import {getAllPost, createPost, editPost, deletePost, getSinglePost,hidePost,unHidePost} from '../controllers/postController.js'
const router = express.Router()


router.route("/posts").post(createPost)
router.route("/posts").get(getAllPost)
router.route("/edit/:id").put(editPost)
router.route("/hide/:id").put(hidePost)
router.route("/unhide/:id").put(unHidePost)
router.route("/singlepost/:id").get(getSinglePost)
router.route("/delete/:id").delete(deletePost)

export default router