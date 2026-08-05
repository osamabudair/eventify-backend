const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getMyEvents } = require('../controllers/eventController');
const { verifyTokenAndClubLeader } = require('../middlewares/verifyToken');

router.get('/', getAllEvents);
router.get('/me', verifyTokenAndClubLeader, getMyEvents);
router.post('/', verifyTokenAndClubLeader, createEvent);

module.exports = router;