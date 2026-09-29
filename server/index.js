require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const upload = multer({ dest: "uploads/" });
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.post("/upload", upload.single("image"), async (req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});