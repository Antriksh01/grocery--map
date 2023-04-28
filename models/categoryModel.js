import mongoose from "mongoose";

const GrocerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const CategoryModel = mongoose.model("grocery", GrocerSchema);
