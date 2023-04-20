const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);



// //this is User.js file userSchema which is save in mongodb
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   created: {
//     type: String,
//     default: new Date().toISOString(),
//   },
//   lastActive: {
//     type: String,
//     required: false,
//   },
//   active: {
//     type: Boolean,
//     default: false,
//   },
//   otp: {
//     type: String,
//   },
//   isAdmin: { 
//     type: Boolean, 
//     default: false 
//   },
  
// },
// { timestamps: true }
// );

// module.exports = mongoose.model('User', userSchema);
// // const mongoose = require("mongoose");

// // const UserSchema = new mongoose.Schema(
// //   {
// //     username: { type: String, required: true, unique: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     profilePic: { type: String, defaut: "" },
// //     isAdmin: { type: Boolean, default: false },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("User", UserSchema);
// //-----------------------------------------------------------------------------------
// // //this file is save as User.js
// // const mongoose = require("mongoose");

// // const UserSchema = new mongoose.Schema(
// //   {
// //     username: { type: String, required: true },
// //     email: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
// //     },
// //     password: {
// //       type: String,
// //       required: true,
// //       minlength: 6,
// //       maxlength: 20,
// //     },
// //     profilePic: { type: String, default: "" },
// //     isAdmin: { type: Boolean, default: false },
// //   },
// //   { timestamps: true }
// // );


// // module.exports = mongoose.model("User", UserSchema);