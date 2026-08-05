const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents } = require('../controllers/eventController');
const { verifyTokenAndClubLeader } = require('../middlewares/verifyToken');

router.get('/', getAllEvents);
router.post('/', verifyTokenAndClubLeader, createEvent);

module.exports = router;