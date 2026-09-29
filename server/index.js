require("dotenv").config();

const { v2: cloudinary } = require("cloudinary");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
    storage: multer.memoryStorage()
});

app.post("/upload", upload.single("image"), async (req, res) => {

    const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(req.file.buffer);
    });

    res.json(result);
});

if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

module.exports = app;