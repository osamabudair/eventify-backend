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
    enum: ['Technology', 'Art', 'Sports', 'Science', 'Business', 'Other'], // بتقدر تعدل الأقسام زي ما بدك
  },
  // ربط الفعالية برئيس النادي اللي أنشأها
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // مصفوفة لتخزين معرفات الطلاب اللي سجلوا بالفعالية
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  maxAttendees: {
    type: Number,
    default: 100,
  }
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
    category: Joi.string().valid('Technology', 'Art', 'Sports', 'Science', 'Business', 'Other').required(),
    maxAttendees: Joi.number().min(1).optional()
  });
  return schema.validate(obj);
}

module.exports = {
  Event,
  validateCreateEvent
};