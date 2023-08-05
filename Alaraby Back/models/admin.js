const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  }
});

adminSchema.pre("save", function (next) {
  // console.log(this);
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

const AdminModel = mongoose.model('admin', adminSchema); 

module.exports = AdminModel;

