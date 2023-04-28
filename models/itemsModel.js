import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "grocery",
    required: true,
  },
});

export const ItemModel = mongoose.model("item", ItemSchema);
