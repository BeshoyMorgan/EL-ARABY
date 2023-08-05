const productModel = require("../models/product");
// const categoryModel = require("../models/categories");



function updatePrdById(id, obj) {
  // return productModel.findByIdAndUpdate(id, obj, { new: true });
  return productModel.findByIdAndUpdate(id, obj)
}

function getPrdById(id) {
  return productModel.findById(id);  //findOne({_id: id})
}

function createPrd(Prd) {
  return productModel.create(Prd);
}

function deletePrd(id) {
  return productModel.deleteOne({_id: id});
}

function getNewestPrdsBycreatedAt(){
  return productModel.find().sort({createdAt:1})
}

module.exports = { getPrdById,createPrd,updatePrdById,deletePrd,getNewestPrdsBycreatedAt };
