const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getMyEvents, deleteEvent } = require('../controllers/eventController');
const { verifyTokenAndClubLeader } = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploads'); 

router.get('/', getAllEvents);
router.get('/me', verifyTokenAndClubLeader, getMyEvents);
router.delete('/:id', verifyTokenAndClubLeader, deleteEvent);

router.post('/', verifyTokenAndClubLeader, upload.single('image'), createEvent);

module.exports = router;