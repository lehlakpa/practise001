import cloudinary from "../config/cloudinaryconfig.js";
import fs from "fs";

const uploadImage = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const uploadResponse = await cloudinary.uploader.upload(localFilePath,
      {
        resource_type: "auto",
        folder: "",
      });

    fs.unlinkSync(localFilePath);
    return uploadResponse;
  }
  catch (error) {
    console.log('Cloudinary Upload Failed', error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
}



export { uploadImage };
