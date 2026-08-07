const mongoose = require("mongoose");
const Joi = require("joi");

// Event Schema
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Art', 'Sports', 'Science', 'Business', 'Entertainment', 'Volunteering', 'Health', 'Other'],
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  maxAttendees: {
    type: Number,
    default: 100,
  },
  time: {
    type: String,
    required: true,
    default: "10:00 AM - 02:00 PM"
  },
  image: {
    type: String,
    default: "",
  },
}, {
  timestamps: true
});

const Event = mongoose.model("Event", EventSchema);

// Validate Create Event
function validateCreateEvent(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(10).required(),
    date: Joi.date().required(),
    location: Joi.string().trim().required(),
    category: Joi.string().valid('Technology', 'Art', 'Sports', 'Science', 'Business', 'Entertainment', 'Volunteering', 'Health', 'Other').required(),
    maxAttendees: Joi.number().min(1).optional(),
    time: Joi.string().required(),
    image: Joi.string().allow('', null).optional(),
  });
  return schema.validate(obj);
}

module.exports = {
  Event,
  validateCreateEvent
};