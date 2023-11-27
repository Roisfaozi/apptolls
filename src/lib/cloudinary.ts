import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function cloudinaryUpload(file: any) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image', folder: 'apptols' }, onDone)
      .end(file)
    function onDone(error: any, result: any) {
      if (error) {
        return reject({ success: false, error })
      }
      return resolve({ success: true, result })
    }
  })
}

export { cloudinaryUpload }
