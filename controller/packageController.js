import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";
import Package from "../model/packageModel.js";

const addPackage = asyncErrorHandler(async (req, res, next) => {
  const {
    vehicleType,
    packagename,
    Personcount,
    distance,
    duration,
    driver,
    price,

    condition,
  } = req.body;
  const addpack = await Package.create({
    vehicleType,
    packagename,
    Personcount,
    distance,
    duration,
    driver,
    price,
    condition,
  });
  res.status(201).send({message:"Add successful"});
});

const getpackage = asyncErrorHandler(async (req, res, next) => {
  const allPack = await Package.find({});
  res.status(200).json(allPack);
});



export { addPackage,getpackage };
