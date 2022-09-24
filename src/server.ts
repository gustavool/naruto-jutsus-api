import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());

app.listen(3000, () =>
  console.log("🔥 Server is running at http://localhost:3000")
);

mongoose.connect(`${process.env.DATABASE_URL}`, () =>
  console.log("📦 Connected to database")
);
