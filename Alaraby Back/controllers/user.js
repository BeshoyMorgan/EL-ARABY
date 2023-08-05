const userModel = require("../models/user");
const productModel = require("../models/product");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// function createUser(user){
//   return userModel.create(user);
// }
function AllUsers(){
  return userModel.find();
}
function getUserById(id) {
  return userModel.findById(id);  //findOne({_id: id})
}

const createUser = async (req, res, next) => {
  var user = req.body;
  try {
    var savedUser = await userModel.create(user);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const updateUserInfo = async (req, res) => {
  var id = req.params.id;
  var doc = req.body;
  try {  
    var updatedUser = await userModel.findByIdAndUpdate( id, doc);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// function deleteUserAcount(id) {
//   return userModel.deleteOne({ _id: id, });
// }

const getCartList = async (req, res, next) => {
  var id = req.params.id;
  try {
    var user = await userModel
      .findOne({ _id: id }, { cart: 1 })
      .populate("cart");
    var products =[];
    for(let i = 0; i < user.cart.length; i++) {
      var product = await productModel.findById(user.cart[i]);
      products.push(product);
    }
    
    res.status(200).json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
};
const getWishList = async (req, res, next) => {
  var id = req.params.id;
  try {
    var user = await userModel
      .findOne({ _id: id }, { wishlist: 1 })
      .populate("wishlist");
      var products =[];
      for(let i = 0; i < user.wishlist.length; i++) {
        var product = await productModel.findById(user.wishlist[i]);
        products.push(product);
      }
      
      res.status(200).json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
};
const getpurchaseHistory = async (req, res, next) => {
  var id = req.params.id;
  try {
    var user = await userModel
      .findOne({ _id: id }, { purchaseHistory: 1 })
      .populate("purchaseHistory");
      var products =[];
      for(let i = 0; i < user.purchaseHistory.length; i++) {
        var product = await productModel.findById(user.purchaseHistory[i]);
        products.push(product);
      }
      
      res.status(200).json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const addToPurchase = async (req, res) => {
  let id = req.params.id;
  let cart = req.body.cart;
  try {
    console.log(cart);
    let user = await userModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { purchaseHistory: { $each: cart } } }
    );
    res.status(200).json({ user, message: "purchaseListUpdated" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// const addToPurchase = async (req, res) => {
//   let id = req.params.id;
//   let gameId = req.params.gameId;
//   try {
//     let user = await userModel.updateOne(
//       { _id: id },
//       { $addToSet: { purchaseHistory: { _id: gameId } } }
//     );
//     res.status(200).json({ user, message: "purchaseHistoryUpdated" });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

const addToCart = async (req, res) => {
  let id = req.params.id;
  let PrdId = req.params.prdId;
  try {
    let user = await userModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { cart: { _id: PrdId } } }
    );
    res.status(200).json({ user, message: "cartUpdated" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
const addToWishList = async (req, res) => {
  let id = req.params.id;
  let PrdId = req.params.prdId;
  try {
    let user = await userModel.updateOne(
      { _id: id },
      { $addToSet: { wishlist: { _id: PrdId } } }
    );
    res.status(200).json({ user, message: "wishListUpdated" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  let id = req.params.id;
  let PrdId = req.params.prdId;
  try {
    let user = await userModel.findOneAndUpdate(
      { _id: id },
      { $pull: { cart: PrdId } }
    );
    res.status(200).json({ user, message: "cartUpdated" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
const removeFromWishList = async (req, res) => {
  let id = req.params.id;
  let PrdId = req.params.prdId;
  try {
    let user = await userModel.findOneAndUpdate(
      { _id: id },
      { $pull: { wishlist: PrdId } }
    );
    res.status(200).json({ user, message: "wishListUpdated" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

async function login(req, res) {
  var { email, password } = req.body;
  var user = await userModel.findOne({ email });
  if (user) {
    var valid = bcrypt.compareSync(password, user.password);
    if (valid) {
      var token = jwt.sign(
        {
          userId: user._id,
          displayName: user.displayName,
        },
        process.env.SECRET
      );
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(401).end();
  }
}

module.exports = {
  AllUsers,
  getUserById,
  getpurchaseHistory,
  getCartList,
  getWishList,
  updateUserInfo,
  createUser,
  login,
  addToWishList,
  addToCart,
  removeFromCart,
  removeFromWishList,
  addToPurchase,
};
