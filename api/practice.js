// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

// app.listen(3000, ()=> {
//     console.log("Backend Server is running");
// })

const mongoose = require("mongoose");
const { string } = require("yargs");

const UserSchema =  new mongoose.Schema({
    username: {type: string, require: true, unique:true},
    email: {type: string, require: true, }
})


//In this endpoint, you first find the user with the provided email address. 
//Then generate a 4-digit OTP and save it to the user's document in the database. Finally, you can send the OTP to the user's email address using any email service provider like nodemailer or sendgrid.
router.post("/generate-otp", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("User not found");
      }
      const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
      user.otp = otp.toString();
      await user.save();
  
      // TODO: Send the OTP to user's email address
      // You can use any email service provider like nodemailer or sendgrid to send email
  
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //In this endpoint, you first find the user with the provided email address. 
  //Then check if the OTP provided by the user matches the OTP saved in the user's document in the database. 
  //If the OTP is invalid, return an error response. Otherwise, create a new user with the provided username, email, and encrypted password. Finally, save the new user to the database and return a success response.
  router.post("/verify-otp", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("User not found");
      }
      if (user.otp !== req.body.otp) {
        return res.status(400).json("Invalid OTP");
      }
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString(),
      });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  