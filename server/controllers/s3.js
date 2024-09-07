import { deleteFiles } from "../config/configS3.js";

export const fileUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload a file", success: false });
        }
        res
            .status(200)
            .json({ message: "File uploaded successfully", file: req.file, success: true });
    } catch (error) {
        console.log("Error while uploading", error);
        res.status(500).json({ error: "Error while uploading", details: error, success: false });
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { key } = req.body;
        const file = await deleteFiles(key);
        res.status(200).json({ message: "File deleted successfully", file, success: true });
    } catch (error) {
        console.log("Error while deleting", error);
        res.status(500).json({ error: "Error while deleting", details: error, success: false });
    }
};