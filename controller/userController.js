import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../model/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";
import sendEmail from "../utils/sendEmail.js";

const singToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};

const registerUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, phoneNo, password } = req.body;

  const exits = await user.findOne({ email });
  if (exits) {
    const error = new CustomError("3", 404);
    return next(error);
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      const error = new CustomError("Hash error", 404);
      return next(error);
    }
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
        const error = new CustomError("Hash error", 404);
        return next(error);
      }
      // Store hash in your password DB.
      const userCreate = await user.create({
        name,
        email,
        phoneNo,
        password: hash,
      });
      const token = jwt.sign(
        { userId: userCreate._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const url = `${process.env.BASE_URL}/user/${userCreate._id}/verify/${token}`;
      await sendEmail({
        name: userCreate.name,
        email: userCreate.email,
        subject: "Verify Email",
        pass: '',  // Since you're passing an empty string
        url: url
      });
      res
        .status(201)
        .send({ message: "An Email sent to your account please verify" });
    });
  });
  //create the user
});

const verifyGmail = asyncErrorHandler(async (req, res, next) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update user's verified status
    await user.findByIdAndUpdate(decoded.userId, { verified: true });

    res.send("Email successfully verified.");
  } catch (error) {
    res.status(400).send("Invalid or expired token.");
  }
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const userFind = await user.findOne({ email });
  if (!userFind) {
    const error = new CustomError("Invalid Credentials", 404);
    return next(error);
  }
  if (userFind && !userFind.verified) {
    const error = new CustomError("verifiy your email", 404);
    return next(error);
  }

  if (userFind && !userFind.isActive) {
    const error = new CustomError("Not Allowed to access", 404);
    return next(error);
  }

  bcrypt.compare(password, userFind.password, async function (err, result) {
    if (err) {
      const error = new CustomError("Internal Server Error", 500);
      return next(error);
    }
    if (result) {
      const newUser = await user.findOne({ email }).select("-password");
      const token = singToken(userFind._id, userFind.email);
      res.cookie("token", token, {
        httpOnly: true,
        // domain: 'localhost',
        path: "/",
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "lax",
      }),
        res.status(200).json({ token, newUser });
    } else {
      const error = new CustomError("Invalid Credential", 500);
      return next(error);
    }
  });
});


const getUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user;
  let newuser;

  try {
    newuser = await user.findById(userId, "-password");
  } catch (err) {
    const error = new CustomError("Login again..", 500);
    return next(error);
  }
  if (!newuser) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ newuser });
});

// all details
const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const alluser = await user.find({}).select("-password");
  res.status(200).json(alluser);
});

// 
const editUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateUser = await user.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(201).send(updateUser)
});

const logOutUser = asyncErrorHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }),
    res.status(200).json({ message: "log out" });
});

export { registerUser, verifyGmail, loginUser, getAllUser,editUser,logOutUser,getUser};
