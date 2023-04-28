import express from "express";
import { CategoryModel } from "../models/categoryModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  let category = new CategoryModel({
    name: req.body.name,
  });
  console.log(category);
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
  console.log(category);
});

router.put("/:id", async (req, res) => {
  try {
    const response = await CategoryModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    // console.log(response);
    if (!response) {
      return res.status(404).json("category not found");
    } else return res.send(response);
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const response = await CategoryModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await CategoryModel.findByIdAndRemove(req.params.id);
    if (response) {
      return res
        .status(200)
        .json({ success: true, msg: "the category is deleted" });
    } else {
      return res.status(404).json({ success: false, msg: "error in deleting" });
    }
  } catch (error) {
    console.log(error);
  }
});

export { router as categoryRouter };
