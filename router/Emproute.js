import { Router } from "express";
import { addEmployee, allEmp, editEmp, oneEmployeeDetails } from "../controller/employeeController.js";

const router = Router();

router.route("/addemp").post(addEmployee);
router.route("/getAll").get(allEmp);
router.route("/editemp/:id").patch(editEmp);
router.route("/getemp/:id").get(oneEmployeeDetails);



export default router;
