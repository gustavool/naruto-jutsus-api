import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import "reflect-metadata";
import "dotenv/config";
import "./container";

import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import corsHandler from "./middlewares/corsHandler";

const PORT = process.env.PORT;
const app = express();

mongoose.connect(`${process.env.DATABASE_URL}`, () =>
  console.log("📦 Connected to database")
);

mongoose.set("debug", true);

app.use(corsHandler());

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(() => console.log(`🔥 Server is running`));
