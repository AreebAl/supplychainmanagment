import {v2 as cloudinary} from 'cloudinary';
import path from 'path' 
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 200000 
});


export const uploadImage = async (file) => {
  try {
    console.log(file)
    const absoluteFilePath = path.resolve(file);
    const result = await cloudinary.uploader.upload(absoluteFilePath,{timeout: 200000});
    return result.secure_url;
  } catch (error) {
    console.log(process.env.CLOUDINARY_API_KEY,"please provide api key")
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};





