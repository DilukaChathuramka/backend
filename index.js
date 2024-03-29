import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


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