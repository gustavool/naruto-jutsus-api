import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import router from "./routes";

const app = express();

mongoose.connect(`${process.env.DATABASE_URL}`, () =>
  console.log("📦 Connected to database")
);

mongoose.connection.on("open", function (ref) {
  console.log("Connected to mongo server.");
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
  });
});

mongoose.set("debug", true);
app.use(express.json());

app.use(router);

app.listen(3000, () =>
  console.log("🔥 Server is running at http://localhost:3000")
);
