import { Router } from "express";
import { addDriver, getAllDriver, updateDriverStatus } from "../controller/driverController.js";
const router = Router();
router.route("/addDriver").post(addDriver);
router.route("/alldriver").get(getAllDriver);
router.route("/updateDriver/:id").patch(updateDriverStatus)

export default router;
