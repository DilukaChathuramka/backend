import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";
import Payment from "../model/paymentModle.js";


const addPayment = asyncErrorHandler(async (req, res, next) => {
    const {
        user,
        packageName,
        payementType,
        billDetails,
        cardDetails,
        customisePackage,
        total,

    } = req.body;
    const addpay = await Payment.create({
        user,
        packageName,
        payementType,
        billDetails,
        customisePackage,
        cardDetails,
        total,
    });
    res.status(201).send({ message: "Add successful" });
});

const getAllPayments = asyncErrorHandler(async (req, res, next) => {
    const payments = await Payment.find({})
        .populate("user")
        .populate("packageName");
    res.status(200).send(payments);
});

const getPaymentById = asyncErrorHandler(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id).populate("packageName");
    if (!payment) {
        return next(new CustomError("No payment found", 404));
    }
    res.status(200).send(payment);
})



export { addPayment,getAllPayments,getPaymentById };