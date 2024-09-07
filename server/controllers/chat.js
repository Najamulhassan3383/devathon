import Chat from '../models/ChatSchema.js';

// Fetch chat by userID and teacherID
export const getChatByUserAndTeacher = async (req, res) => {
    try {
        const { userID, teacherID } = req.params;

        // Find the chat between the specified user and teacher
        const chat = await Chat.findOne({ userID, teacherID }).populate('chat.senderID', 'name'); // Assuming 'name' is stored in the User model

        if (!chat) {
            return res.status(404).json({ message: "No chat found between the user and teacher" });
        }

        // Return the chat history
        res.status(200).json(chat.chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getChatByUserOrTeacher = async (req, res) => {
    try {
        const { ID} = req.params;

        //fetch all chat of user or teacher 
        const chat = await Chat.find({ $or: [{ userID: ID }, { teacherID: ID }] }).populate('chat.senderID', 'name'); // Assuming 'name' is stored in the User model

        if (!chat) {
            return res.status(404).json({ message: "No chat found between the user and teacher" });
        }

        // Return the chat history
        res.status(200).json(chat.chat);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
