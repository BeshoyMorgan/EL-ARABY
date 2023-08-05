
const express = require("express");
var router = express.Router();
const product = require("../models/product");
const { getPrdById,createPrd,updatePrdById,deletePrd,getNewestPrdsBycreatedAt } = require("../controllers/product");
const productModel = require('../models/product');
// const categoryModel = require("../models/categories");

const { auth } = require('../middlewares/auth')

router.use(auth)

router.get("/:id", async (req, res) => {   // get prd by id
  
  var id = req.params.id;
    try {
        var prd = await getPrdById(id);
        res.json( prd );
    } catch (error) {
        res.status(422).json({message: error.message});
    }

});

router.post("/", async (req, res, next) => {    // save new prd

  var prd = req.body;
  try {
    var savedprd = await createPrd(prd);
    res.status(201).json(savedprd);
  } catch (error) {
    res.status(422).json({message: error.message});
  }

});

router.patch("/:id", async (req, res) => {   // update new prd
  var id = req.params.id;
  var obj = req.body;
  try {
    var updatedPrd = await updatePrdById(id, obj);
    res.status(200).json(updatedPrd) // {message: 'product updated successfully'}
  } catch (error) {
    res.status(422).json({message: error.message});
  }

});

router.delete("/:id", async (req, res) => {   // delete prd

  var id = req.params.id;
  try {
    var deletedPrd = await deletePrd(id);
    res.json({message: 'product deleted successfully'});
  } catch (error) {
    res.status(422).json({message: error.message});
  }

});

// brand   localhost:5000/products/TORNADO/brand
router.get('/:brand/brand', async (req, res) => {   // get all products by brand
  // var id = req.params.id;
  var b = req.params.brand;
  try {
    // var products = await getPrdsByBrand(brand);
    var products = await productModel.find({brand:b})
    res.json( products );
} catch (error) {
    res.status(422).json({message: error.message});
}
});

// category   localhost:5000/products/TV/category
router.get('/:category/category', async (req, res) => {   // get all products by category
  // var id = req.params.id;
  var cat = req.params.category;
  try {
    // var products = await getPrdsBycategory(category);
    var products = await productModel.find({category:cat})
    res.status(200).json( products );
} catch (error) {
    res.status(422).json({message: error.message});
}
});

// createdAt    news
router.get("/", async (req, res, next) => {   // get all products
  
    try {
        var products = await getNewestPrdsBycreatedAt();
        res.json( products );
    } catch (error) {
        res.status(422).json({message: error.message});
    }
});

module.exports = router;


