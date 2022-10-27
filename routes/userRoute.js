import express from 'express'
import { loginUser, recoverAccount, signUp,deactivatedAccount } from '../controllers/userController.js'
const router = express.Router()

router.route("/").post(signUp)
router.route("/login").post(loginUser)
router.route("/deactivatedAccount").post(deactivatedAccount)
router.route("/recoverAccount/:resetAccount").put(recoverAccount)


export default router