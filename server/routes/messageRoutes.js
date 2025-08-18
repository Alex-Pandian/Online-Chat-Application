const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { sendMessage, getMessages } = require('../controllers/messageController');

router.post('/message', auth, sendMessage);
router.get('/message/:chatId', auth, getMessages);

module.exports = router;