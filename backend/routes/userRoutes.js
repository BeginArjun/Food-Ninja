import express from "express"
import { authUser, getUserById, updateUser, 
    getUserProfile, deleteUser, 
    registerUser, updateUserProfile, getUsers 
} from "../controllers/userController.js"

import {auth,adminAuth} from "../middleware/auth.js"

const router=express.Router()

router.route("/").get(getUsers).post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(auth,getUserProfile).patch(auth,updateUserProfile)
router.route("/:id").get([auth,adminAuth],getUserById).patch([auth,adminAuth],updateUser).delete([auth,adminAuth],deleteUser)

export default router