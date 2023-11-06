import axios from "axios";
const API = axios.create({ baseURL: process.env.SERVER_BASE_URL });

export const registerUser = (data) => API.post("/register", data);
export const generateOtp = (phone) => API.get(`otpGenerate/${phone}`);
export const submitOtp = (data) => API.post("/otpValidate", data);
export const generateLyrics = (data) => API.post("/generateLyrics", data);
export const generateSong = (lyrics) =>
  API.post("/generateSong", {lyrics}, { responseType: "blob" });
