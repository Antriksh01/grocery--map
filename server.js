import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { itemRouter } from "./routes/itemRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/category", categoryRouter);
app.use("/category/items", itemRouter);

mongoose
  .connect("mongodb://localhost:27017/grocery-map", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

app.listen(4300, console.log("server started"));
