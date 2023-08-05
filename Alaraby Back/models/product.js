const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    description_ar: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      // default: "Free",
    },
    brand: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      // default: [""],
    }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Game", gameSchema);
const productModel = mongoose.model("product", productSchema); // create middleware, gameModel carries gameShema  //" Game : is the collection name

module.exports = productModel; // export gameModel
