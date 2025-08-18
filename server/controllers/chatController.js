const Chat = require('../models/chatModel');

exports.getOrCreateChat = async (req, res) => {
  const { recipientId } = req.body;
  const userId = req.userId;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, recipientId] }
    });

    if (!chat) {
      chat = new Chat({ participants: [userId, recipientId] });
      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Chat error' });
  }
};