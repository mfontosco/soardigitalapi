import express from 'express'
import { loginUser, recoverAccount, signUp,getUser,getUsers,deactivatedAccount } from '../controllers/userController.js'
const router = express.Router()

router.route("/").post(signUp)
router.route("/login").post(loginUser)
router.route("/getuser/:id").get(getUser)
router.route("/getusers").get(getUsers)
router.route("/deactivatedAccount").post(deactivatedAccount)
router.route("/recoverAccount/:resetAccount").put(recoverAccount)


export default router