import bcrypt from "bcryptjs";
import { CustomError } from "../utils/customerError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import user from "../model/userModel.js";

const addDriver = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body)
  const { name, email, phoneNo, license,address } = req.body;

  const exits = await user.findOne({ email });
  if (exits) {
    const error = new CustomError("user name already have", 404);
    return next(error);
  }
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  function generateMemorablePassword() {
    const words = generateRandomString(3);
    const separators = ["-", "_", ".", "!", "#"];
    const randomWord = () => words[Math.floor(Math.random() * words.length)];
    const randomNumber = () => Math.floor(Math.random() * 10); // random digit
    const randomSeparator = () =>
      separators[Math.floor(Math.random() * separators.length)];

    return `rentalemp${randomSeparator()}${randomNumber()}${randomWord()}`;
  }

  const newPassword = generateMemorablePassword();
  console.log(newPassword);

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      const error = new CustomError("Hash error", 404);
      return next(error);
    }
    bcrypt.hash(newPassword, salt, async function (err, hash) {
      if (err) {
        const error = new CustomError("Hash error", 404);
        return next(error);
      }
      // Store hash in your password DB.
      const addDriver = await user.create({
        name,
        email,
        phoneNo,
        license,
        address,
        password: hash,
        role:"driver"
      });

      const url = `${process.env.BASE_URL}/login`;
      await sendEmail({
        name: addDriver.name,
        email: addDriver.email,
        subject: `your Login UserName password`,
        pass: newPassword,
        url,
      });
      res.status(201).send({ message: "E-mail password send to the mail" });
    });
  });
});


const getAllDriver=asyncErrorHandler(async(req,res,next)=>{
  const driver=await user.find({role:"driver",isActive:true});
  res.status(200).send(driver);
})

const updateDriverStatus=asyncErrorHandler(async(req,res,next)=>{
  const driverStatus = await user.findByIdAndUpdate(
    req.params.id,
    {
      isActive: false,
    },
    { new: true }
  );
  res.json({ message: "ok", driverStatus });
});


export { addDriver,getAllDriver,updateDriverStatus};
