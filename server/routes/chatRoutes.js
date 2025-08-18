const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getOrCreateChat } = require('../controllers/chatController');

router.post('/chat', auth, getOrCreateChat);

module.exports = router;