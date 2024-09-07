import Chat from '../models/ChatSchema.js';
import User from '../models/UserSchema.js';

// Fetch chat by userID and teacherID
export const getChatByUserAndTeacher = async (req, res) => {
    try {
        const { userID, teacherID } = req.params;

        let chat = await Chat.findOne({
            $or: [
                { chatID: `${userID}-${teacherID}` },
                { chatID: `${teacherID}-${userID}` }
            ]
        }).populate('chat.senderID', 'fName lName');

        if (!chat) {
            chat = new Chat({
                chatID: `${userID}-${teacherID}`,
                userID,
                teacherID,
                chat: []
            });
            await chat.save();
        }

        res.status(200).json(chat.chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getChatByUserOrTeacher = async (req, res) => {
    try {
        const { ID } = req.params;

        const chats = await Chat.find({
            $or: [
                { chatID: { $regex: ID } },
                { userID: ID },
                { teacherID: ID }
            ]
        }).populate('userID', 'fName lName')
          .populate('teacherID', 'fName lName');

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: "No chats found." });
        }

        const formattedChats = chats.map(chat => {
            const otherUser = chat.userID._id.toString() === ID ? chat.teacherID : chat.userID;
            const lastMessage = chat.chat[chat.chat.length - 1];
            return {
                chatID: chat.chatID,
                otherUser: {
                    _id: otherUser._id,
                    name: `${otherUser.fName} ${otherUser.lName}`
                },
                lastMessage: lastMessage ? {
                    message: lastMessage.message,
                    time: lastMessage.time
                } : null
            };
        });

        res.status(200).json(formattedChats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
