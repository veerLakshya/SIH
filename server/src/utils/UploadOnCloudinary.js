import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
cloudinary.config({
    cloud_name: "dlsimdr0h",
    api_key: "341183891669816",
    api_secret: "Pk6Aw4deO8ezrhksRu6omrc2g4k"
});

const uploadOnCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                file.path,
                {
                    resource_type: "auto",
                    public_id: uuid(),
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    });
    try {
        const results = await Promise.all(uploadPromises);

        const formattedResults = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));
        return formattedResults;
    } catch (err) {

        console.log(err)
        throw new Error("Error uploading files to cloudinary", err);
    }


}
export default uploadOnCloudinary;