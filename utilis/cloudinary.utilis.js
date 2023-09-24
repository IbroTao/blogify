require('dotenv').config()

const cloudinary = require('cloudinary');

const API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const CLOUD_SECRET = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.v2.config({
    api_key: API_KEY,
    cloud_name: CLOUD_NAME,
    api_secret: CLOUD_SECRET 
});

const uploadToCloud = async(filepath) => {
    const {secure_url} = await cloudinary.v2.uploader.upload(filepath);
    return secure_url;
};

const deleteCloud = async(fileurl) => {
    return cloudinary.v2.uploader.destroy(fileurl)
};

module.exports = { uploadToCloud, deleteCloud};