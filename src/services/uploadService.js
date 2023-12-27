const multer = require("multer");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
const bufferToDataURI = require("../utils/dataUriParser")

require("dotenv").config()
// console.log(process.env.CLOUDINARY_API_KEY)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
    try {
        const { uploader } = cloudinary;

        const res = await uploader.upload(
            `data:image/${format};base64,${fileString}`
        );

        return res;
    } catch (error) {
        throw new ErrorHandler(500, error);
    }
};

const uploadImage = async (file) =>{
    const fileFormat = file.mimetype.split('/')[1]
    const { base64 } = bufferToDataURI(fileFormat, file.buffer)

    const imageDetails = await uploadToCloudinary(base64, fileFormat)
    return imageDetails
}

module.exports = {
    upload,
    uploadToCloudinary,
    uploadImage
};