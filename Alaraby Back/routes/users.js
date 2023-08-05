var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
const productModel = require("../models/product");
const {
  AllUsers,
  getUserById,
  getpurchaseHistory,
  getCartList,
  getWishList,
  updateUserInfo,
  createUser,
  login,
  addToWishList,
  addToCartList,
  addTopurchaseHistory,
  addToCart,
  removeFromCart,
  removeFromWishList,
  addToPurchase,
} = require("../controllers/user");

router.get("/", async(req, res, next) => {   // get all users
  try{
    var usersList=await AllUsers()
    res.status(200).json(usersList)
  }catch(err){
    res.status(422).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {   // get user by id
  var id = req.params.id;
    try {
        var user = await getUserById(id);
        res.json( user );
    } catch (error) {
        res.status(422).json({message: error.message});
    }
});

router.post("/", createUser);         // add user
router.patch("/addToCart/:id/:prdId", addToCart);             // add to Cart
router.patch("/addToWishList/:id/:prdId", addToWishList);    // add to Wish List
router.patch("/addToPurchase/:id", addToPurchase);       // add to purchase history
router.get("/getCart/:id", getCartList);                // get all products in Cart
router.get("/getWishList/:id", getWishList);           // get all products in Wish List
router.get("/getPurchase/:id", getpurchaseHistory);   // get all products in purchase history
router.patch("/removeFromCart/:id/:prdId", removeFromCart);     // remove from cart
router.patch("/removeFromWishList/:id/:prdId", removeFromWishList);   // remove from Wish List

// router.get("/:id/wishList", getWishList);
// router.get("/:id/cart",getCartList );
// router.get("/:id/purchaseHistory", getpurchaseHistory);

// Add more than one user
// router.patch("/:id/wishList/:gameID", addToWishList);  // add to wish list

// router.patch("/:id/cart/:gameID",addToCartList );   // add to cart
// router.patch("/:id/purchaseHistory/:gameID", addTopurchaseHistory);  // add to purchase history

router.patch("/:id", updateUserInfo);

router.delete("/:id", async (req, res) => {    // delete user
  try {
    var id = req.params.id;
    var deletedUser = await userModel.deleteOne({
      _id: id,
    });
    res.json(deletedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", login);

module.exports = router;
