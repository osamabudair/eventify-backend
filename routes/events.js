const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventController');
const { verifyTokenAndClubLeader } = require('../middlewares/verifyToken');

// مسار إنشاء فعالية جديدة (محمي بصلاحيات رئيس النادي)
// /api/events
router.post('/', verifyTokenAndClubLeader, createEvent);

module.exports = router;