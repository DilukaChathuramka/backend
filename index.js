import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./controller/errorController.js";
import userRouter from "./router/userRouter.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.BASE_URL],
    credentials: true,
  })
);

app.use("/user", userRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

// globale error handling middleware
app.use(globalErrorHandler);

mongoose
  .connect(process.env.CONNECT_STR)
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

const port =process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server running ${port}`);
  });