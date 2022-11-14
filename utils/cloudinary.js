import { v2 as cloudinary } from 'cloudinary';
const { apiKeySecret } = require('../config');
const { cloudName,apiKey,apiKeySecret } = require("./config")


cloudinary.config({
    cloudName: cloudName,
    apiKey: apiKey,
    apiSecret: apiKeySecret
});

module.exports = cloudinary;