const asyncHandler = require("express-async-handler");
const { Event, validateCreateEvent } = require("../models/Event");

/**
 *  @desc    Create New Event
 *  @route   /api/events
 *  @method  POST
 *  @access  private (Only Club Leaders & Admins)
 */
const createEvent = asyncHandler(async (req, res) => {
  const { error } = validateCreateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    category: req.body.category,
    maxAttendees: req.body.maxAttendees,
    organizer: req.user.id, 
  });

  const result = await event.save();
  res.status(201).json(result);
});

/**
 *  @desc    Get All Events
 *  @route   /api/events
 *  @method  GET
 *  @access  public
 */
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
    .populate("organizer", "username email")
    .sort({ createdAt: -1 });
    
  res.status(200).json(events);
});

module.exports = {
  createEvent,
  getAllEvents,
};