import { Router } from "express";
import { editUser, getAllUser, getUser, logOutUser, loginUser, registerUser, updateuserStatus, verifyGmail } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/:id/verify/:token").get(verifyGmail);
router.route("/login").post(loginUser);
router.route("/alluser").get(getAllUser);
router.route("/edituser/:id").patch(editUser);
router.route("/logout").get(logOutUser);
router.route("/getuser").get(protect,getUser);
router.route("/userDelete/:id").patch(updateuserStatus);






export default router;
