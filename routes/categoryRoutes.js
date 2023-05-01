import express from "express";
import { CategoryModel } from "../models/categoryModel.js";
const router = express.Router();

// add category
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

// update-category
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

// get-category
router.get("/", async (req, res) => {
  try {
    const response = await CategoryModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// get-single-category
router.get("/:id", async (req, res) => {
  try {
    const response = await CategoryModel.findById(req.params.id);
    if (response) {
      return res.status(200).json({ success: true, response });
    } else {
      return res.status(404).json({ success: false, response });
    }
  } catch (error) {
    console.log(error);
  }
});

// delete-category
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
