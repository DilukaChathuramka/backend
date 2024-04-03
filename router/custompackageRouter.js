import { Router } from "express";
import { addcustomizePackage, getAllCustomPackage } from "../controller/customPackageController.js";

const router = Router();
router.route("/addcustompackage").post(addcustomizePackage);
router.route("/getallcustompackage").get(getAllCustomPackage);




export default router;
