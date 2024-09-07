import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();
const s3 = new S3Client({
    credentials: {
        secretAccessKey: process.env.S3_SECRET_KEY,
        accessKeyId: process.env.S3_ACCESS_KEY,
    },
    region: process.env.S3_REGION,
});

export const uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(
                null,
                file.mimetype.split("/")[0] + "-" + Date.now().toString() + generateRandomString() + "-" + file.originalname
            );
        },
    }),
});

export const deleteFiles = async (filePathInS3) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: [{ Key: filePathInS3 }],
            },
        };
        await s3.send(new DeleteObjectsCommand(params));
    } catch (error) {
        console.log("Error while deleting", error);
    }
};

const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
};