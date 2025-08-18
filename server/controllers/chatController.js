const Chat = require('../models/chatModel');
const User = require('../models/userModel');

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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};