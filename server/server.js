const express = require("express");
const cors = require("cors"); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

// Use the CORS middleware
app.use(cors());

// Middleware setup
app.use(express.json());

//Database Connect
const connect = require("./src/config/mongoose.js");
const UserModel = require("./src/model/userSchema.js");
const { registerController, getOtpController, otpValidateController, generateLyrics ,generateSong} = require("./src/controllers/userController.js");
connect();

app.get("/", (req, res) => {
  res.send("connected");
});

app.post("/register",registerController);
app.get("/otpGenerate/:phone",getOtpController)
app.post("/otpValidate",otpValidateController)
app.post("/generateLyrics",generateLyrics)
app.post("/generateSong",generateSong)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
