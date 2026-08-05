const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getMyEvents, deleteEvent } = require('../controllers/eventController');
const { verifyTokenAndClubLeader } = require('../middlewares/verifyToken');

router.get('/', getAllEvents);
router.get('/me', verifyTokenAndClubLeader, getMyEvents);
router.post('/', verifyTokenAndClubLeader, createEvent);
router.delete('/:id', verifyTokenAndClubLeader, deleteEvent);

module.exports = router;