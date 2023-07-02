import express from "express"
import { authUser, getUserById, updateUser, 
    getUserProfile, deleteUser, 
    registerUser, updateUserProfile, getUsers 
} from "../controllers/userController.js"

const router=express.Router()

router.route("/").get(getUsers).post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(getUserProfile).patch(updateUserProfile)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

export default router