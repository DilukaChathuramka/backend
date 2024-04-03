import CustomPackage from "../model/customPackageModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";
const addcustomizePackage = asyncErrorHandler(async (req, res, next) => {
    const {
        user,
        vehicleType,
        vehicleCondition,
        distance,
        duration,
        vehicle,
        driver
    } = req.body;
    const addcustom = await CustomPackage.create({
        user,
        vehicleType,
        vehicleCondition,
        distance,
        duration,
        vehicle,
        driver
    });
    res.status(201).send({ message: "Add successful", addcustom:addcustom._id });
});

const getAllCustomPackage = asyncErrorHandler(async (req, res, next) => {
    const customPackage = await CustomPackage.find({});
    res.status(200).send(customPackage);
});

export { addcustomizePackage, getAllCustomPackage};
