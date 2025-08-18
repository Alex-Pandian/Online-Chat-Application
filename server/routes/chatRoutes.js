const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getOrCreateChat, getUsers } = require('../controllers/chatController');

router.post('/chat', auth, getOrCreateChat);
router.get('/getUsers', getUsers);

module.exports = router;