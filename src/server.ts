import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

mongoose.connect(`${process.env.DATABASE_URL}`, () =>
  console.log("📦 Connected to database")
);

app.listen(3000, () =>
  console.log("🔥 Server is running at http://localhost:3000")
);
