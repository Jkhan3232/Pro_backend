import { Router } from "express";
import {
    loginUser, logoutUser, registerUser,
    refreshAccessToken, changeCurrentPassword,
    updateAccountDetails, updateUserAvatar,
    updateUserCoverImage, getCurrentUser

} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middlewere.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/update-password").patch(verifyJWT, changeCurrentPassword)
router.route("/update-profile").patch(verifyJWT, updateAccountDetails)

router.route
    ("/updateUserAvatar").patch(verifyJWT, upload.fields([{
        name: "avatar",
        maxCount: 1
    }])
        , updateUserAvatar)
router.route
    ("/updateUserCoverImage").patch(verifyJWT, upload.fields([{
        name: "coverImage",
        maxCount: 1
    }]),
        updateUserCoverImage)

router.route("/profile").get(verifyJWT, getCurrentUser)


export default router