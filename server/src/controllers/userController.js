const twilio = require("twilio");
const UserModel = require("../model/userSchema");
const { default: OpenAI } = require("openai");
const gtts = require("gtts");
const fs = require("fs");
const os = require("os");
const path = require("path");

const registerController = async (req, res) => {
  console.log("register-req:", req.body);
  const { phoneNumber, fullName, emailId } = req.body;
  try {
    const user = await UserModel.findOne({ email: emailId });
    if (user) {
      res.status(200).json({ message: "user exists" });
    } else {
      console.log("creating newUser");
      const newUser = new UserModel({
        name: fullName,
        email: emailId,
        phoneNumber: phoneNumber,
      });
      const savedUser = await newUser.save();
      console.log("newUser created:", savedUser);
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOtpController = async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  console.log(process.env.VERIFICATION_SID, "::", authToken, "::", accountSid);
  const client = twilio(accountSid, authToken);

  try {
    const { phone } = req.params;
    console.log("phone", phone);

    client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verifications.create({ to: `+91${phone}`, channel: "sms" })
      .then((verification) => {
        console.log(verification.sid);
        return res.status(200).json(verification);
      })
      .catch((err) => {
        if (err.status === 429) {
          console.log("code:", err.code);
          return res.status(429).json({ code: 60203 });
        }
      });
  } catch (err) {
    console.error("server error", err);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const otpValidateController = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log(phone, otp);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    console.log(
      process.env.VERIFICATION_SID,
      "::",
      authToken,
      "::",
      accountSid
    );
    const client = twilio(accountSid, authToken);

    client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp })
      .then((verification_check) => {
        console.log(verification_check.status);
        if (verification_check.status === "approved") {
          return res.status(200).json({ message: "otp verified" });
        } else {
          return res.status(400).json({ message: "otp not verified" });
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const generateLyrics = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { name, angry, funniestThing, smile, petname, movie, genre, favSport } =
    req.body;
  const prompt = `Wish a happy birthday to ${name}. 
    His/Her/Their pet name is ${petname}. 
    ${angry} makes him/her/them angry. 
    ${funniestThing} makes him/her/them funniest. 
    ${smile} makes him/her/them special. 
    ${movie} movie He/she/they likes/like the most. 
    ${favSport} sports He/she/they likes/like the most. 
    
    Ensure that "Happy birthday" is mentioned at least twice in the lyrics, and it should rhyme. The lyrics should use simple, short, and easy to pronounce words as much as possible.
    
    Using the above information about ${name}, please write 16 lines of ${genre} lyrics that I can dedicate to him/her/them for his/her/their birthday.  Each line can have maximum of 8 words or 40 characters.
    The lyrics generated should be completely unique and never written before every single time and should not in any way or manner infringe on any trademarks/copyrights or any other rights of any individual or entity anywhere in the world. Any references or similarity to existing lyrics of any song anywhere in the world needs to be completely avoided. Any mention of proper nouns i.e. names or places of any manner apart from the ones mentioned above needs to be completely avoided. The lyrics generated should not be insensitive or should not offend any person/ place/ caste/ religion/ creed/ tribe/ country/ gender/ government/ organisation or any entity or individual in any manner whatsoever. Any words which might be construed directly or indirectly as cuss words or are offensive in any language should also be completely avoided. 
    `;
  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 400,
    });
    if (completion.choices[0].text) {
      const result = completion.choices[0].text;
      res.status(200).json({ result, message: "generated successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const appPrefix = "my-app";

const generateSong = async (req, res) => {
  try {
    const { lyrics } = req.body;
    console.log("lyrics:", lyrics);

    // Create a temporary directory
    let tmpDir;
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix));
      const audioFilePath = path.join(tmpDir, "audio.mp3");

      const tts = new gtts(lyrics, "en");
      tts.save(audioFilePath, (err, result) => {
        if (err) {
          console.error("errorInSaving", err);
          return res.status(500).json({ error: "Audio generation failed" });
        }

        console.log("save_success:", result);

        // Send the audio file to the response
        res.sendFile(audioFilePath, (err) => {
          if (err) {
            console.error("sendfileerr:", err);
            res.status(500).json({ error: "Sending audio failed" });
          }

          // Clean up the temporary directory and file
          fs.rmSync(tmpDir, { recursive: true });
        });
      });
    } catch (e) {
      console.error(
        "An error occurred while creating a temporary directory:",
        e
      );
      return res
        .status(500)
        .json({ error: "Temporary directory creation failed" });
    }
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerController,
  getOtpController,
  otpValidateController,
  generateLyrics,
  generateSong,
};
