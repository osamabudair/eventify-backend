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

  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    category: req.body.category,
    maxAttendees: req.body.maxAttendees,
    organizer: req.user.id,
    image: imagePath,
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

/**
 *  @desc    Get My Events (Club Leader)
 *  @route   /api/events/me
 *  @method  GET
 *  @access  private (Only Club Leaders & Admins)
 */
const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizer: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(events);
});

/**
 *  @desc    Delete Event
 *  @route   /api/events/:id
 *  @method  DELETE
 *  @access  private (Only Event Owner or Admin)
 */
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.organizer.toString() !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ message: "You are not allowed to delete this event" });
  }

  await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Event deleted successfully" });
});


/**
 *  @desc    Get Single Event by ID
 *  @route   /api/events/:id
 *  @method  GET
 *  @access  public
 */
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('organizer', 'username');
  
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  
  res.status(200).json(event);
});

module.exports = {
  createEvent,
  getAllEvents,
  getMyEvents,
  deleteEvent,
  getEventById,
};