const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const senderId = req.userId;

  try {
    const message = new Message({ chat: chatId, sender: senderId, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Message send failed' });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'email fullName')
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Message fetch failed' });
  }
};