import { Router } from "express";
import { addPackage, getpackage } from "../controller/packageController.js";


const router = Router();
router.route("/addpackage").post(addPackage);
router.route("/getpackage").get(getpackage);



export default router;