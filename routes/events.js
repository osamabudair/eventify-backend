const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getMyEvents, deleteEvent, getEventById } = require('../controllers/eventController');
const { verifyTokenAndClubLeader } = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploads'); 

router.get('/', getAllEvents);
router.get('/me', verifyTokenAndClubLeader, getMyEvents);
router.get('/:id', getEventById);
router.delete('/:id', verifyTokenAndClubLeader, deleteEvent);

router.post('/', verifyTokenAndClubLeader, upload.single('image'), createEvent);

module.exports = router;