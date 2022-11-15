const { cloudName , apiKey , apiSecret } = require("../config");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloudName:cloudName,
    apiKey:apiKey,
    apiSecret:apiSecret
});

moudle.exports = cloudinary