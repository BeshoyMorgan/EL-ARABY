const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const productModel = require("./product");

const userSchema = mongoose.Schema(
  // {"name": 'beshoy', "password": "123456b", "email": 'beshoy@gmail.com',
  // "purchaseHistory": [ObjectId("6455d2d325df624a149deaec")],
  // "cart": [ObjectId("6455d2d325df624a149deaec")],
  // "wishlist": [ObjectId("6455d2d325df624a149deaec")]}
  {
    // country: {
    //   type: String,
    //   // required: true
    // },
    name: {
      type: String,
      minLength: 3,
      // maxLength: 20,
    },
    email: {
      type: String,
      // unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    purchaseHistory: {
      type: [mongoose.Schema.Types.ObjectId],
      // ref: "Product",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Product",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

// const Product = mongoose.model('Product', productModel);

userSchema.pre("save", function (next) {
  // console.log(this);
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
