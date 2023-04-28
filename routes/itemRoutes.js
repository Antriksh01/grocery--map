import express from "express";
import { ItemModel } from "../models/itemsModel.js";
import { CategoryModel } from "../models/categoryModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const cate_res = await CategoryModel.findById(req.body.category);
  if (!cate_res) return res.status(400).send("invalid category");
  const itemList = new ItemModel(req.body);
  try {
    const response = await itemList.save();
    res.status(201).send({
      success: true,
      msg: "items added to the list",
      response,
    });
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  const product = await ItemModel.find(req.body).populate("category");
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await ItemModel.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const cate_res = await CategoryModel.findById(req.body.category);
  if (!cate_res) return res.status(400).send("invalid category");
  try {
    const product = await ItemModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
      },
      { new: true }
    ).populate("category");
    // console.log(response);
    if (!product) {
      return res.status(404).json("product not found");
    } else return res.send(product);
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  //   const cate_res = await CategoryModel.findById(req.body.category);
  //   if (!cate_res) return res.status(400).send("invalid category");
  try {
    const product = await ItemModel.findByIdAndRemove(req.params.id).populate(
      "category"
    );
    if (product) {
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

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await ItemModel.find(filter).populate("category");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

export { router as itemRouter };
