const asyncHandler = require("express-async-handler");
const { Event, validateCreateEvent } = require("../models/Event");

/**
 *  @desc    Create New Event
 *  @route   /api/events
 *  @method  POST
 *  @access  private (Only Club Leaders & Admins)
 */
const createEvent = asyncHandler(async (req, res) => {
  // 1. التحقق من البيانات اللي بعثها رئيس النادي
  const { error } = validateCreateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // 2. تجميع بيانات الفعالية
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    category: req.body.category,
    maxAttendees: req.body.maxAttendees,
    organizer: req.user.id, // الحارس (Middleware) هو اللي وفرلنا الـ id هون
  });

  // 3. الحفظ في MongoDB وإرجاع النتيجة
  const result = await event.save();
  res.status(201).json(result);
});

module.exports = {
  createEvent,
};