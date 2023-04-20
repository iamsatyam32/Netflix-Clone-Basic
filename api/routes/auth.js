const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// const router = require("express").Router();
// const User = require("../models/User");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const cookieParser = require('cookie-parser');
// require('dotenv').config(); 

// // Nodemailer transporter object
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
// });

// // Generate random 4-digit OTP with 10 minute expiration time
// const generateOTP = () => {
//   const digits = "0123456789";
//   let OTP = "";
//   for (let i = 0; i < 4; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   const OTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
//   return { OTP, OTPExpires };
// };

// router.use(cookieParser());

// // Register new user and send OTP
// router.post('/register', async (req, res) => {
//   // Check if email and username are provided
//   if (!req.body.email || !req.body.username) {
//   return res.status(400).send('Email and username are required');
//   }
  
//   // Check if user already exists
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('User already registered');
  
//   // Generate OTP
//   const otp = generateOTP();
  
//   // Create new user object with email, username and generated OTP
//   user = new User({
//   email: req.body.email,
//   username: req.body.username,
//   password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
//   active: false,
//   otp: otp.OTP,
//   otpExpires: otp.OTPExpires,
//   status: "pending",
//   });
  
//   // Save user object to database
//   try {
//   await user.save();

//   // Send email with OTP to user
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: req.body.email,
//     subject: "OTP Verification for your account on MyApp",
//     text: `Your OTP for account verification is ${otp.OTP}. This OTP will expire in 10 minutes.`,
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Failed to send OTP" });
//     } else {
//       console.log("Email sent: " + info.response);
//       // Set cookie after successfully sending OTP to user's email
//       res.cookie('auth', 'register').send('OTP sent successfully to user email');
//     }
//   });
//   } catch (err) {
//   console.log(err);
//   res.status(500).send('Error saving user in database');
//   }
//   });
  
//   // Verify user with OTP
//   router.post('/verify', async (req, res) => {
//   const { email, otp } = req.body;
  
//   try {
//   // Find the user with the given email
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
  
//   // Check if the OTP entered by the user matches the one generated for the user
//   if (otp !== user.otp) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }
  
//   // Check if the OTP has expired
//   if (Date.now() > user.otpExpires) {
//     return res.status(400).json({ message: "OTP has expired" });
//   }
  
//   // Update the user's status to "active" and remove the otp and created fields
//   user.active = true;
//   user.otp = undefined;
//   user.created = undefined;
//   await user.save();
  
//   // Set cookie after successfully verifying user's OTP
//   res.cookie('auth', 'login').status(200).json({ message: "User verified successfully" });
//   } catch (err) {
//   console.log(err);
//   res.status(500).json({ message: "Failed to verify user" });
//   }
// });

// //LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).json("Wrong password or username!");
//     }

//     if (!user.active) {
//       return res.status(400).json("Verify your otp for login!");
//     }

//     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
//     const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//     if (originalPassword !== req.body.password) {
//       return res.status(401).json("Wrong password or username!");
//     }

//     const accessToken = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.SECRET_KEY,
//       { expiresIn: "5d" }
//     );

//     const { password, ...info } = user._doc;

//     res.cookie("auth", "login", { httpOnly: true })
//       .status(200)
//       .json({ ...info, accessToken });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('auth');
//   res.status(200).json({ message: 'User logged out successfully' });
// });


// module.exports = router;
