import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";

import Feedback from "../model/feedbackModel.js";

const addFeedback = asyncErrorHandler(async (req, res, next) => {
    const { user, vehicle, driver, message } = req.body;
    const addFeedback = await Feedback.create({
        user,
        vehicle,
        driver,
        message,
    });
    res.status(201).send({ message: "Feedback added successfully" });
});

const getFeedback = asyncErrorHandler(async (req, res, next) => {
    const allFeedback = await Feedback.find({isAtive:true}).populate('user').select("-password").populate('vehicle').populate('driver');
    res.status(200).json(allFeedback);
});

const acceptFeedback = asyncErrorHandler(async (req, res, next) => {  
 
    const feedback = await Feedback.findByIdAndUpdate(req.params.id,{status:true},{new:true});
    res.status(200).send({ message: "Feedback accepted successfully" });
 });

const deleteFeedback = asyncErrorHandler(async (req, res, next) => { 
    const feedback = await Feedback.findByIdAndUpdate(req.params.id,{isActive:false},{new:true});
    res.status(200).send({ message: "Feedback Delete" });
   })
  
export { addFeedback, getFeedback, acceptFeedback,deleteFeedback};