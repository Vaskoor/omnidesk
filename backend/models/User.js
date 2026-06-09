const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'agent', 'viewer'], default: 'agent' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  facebookId: String,
  facebookToken: String,
  instagramId: String,
  instagramToken: String,
  tiktokId: String,
  tiktokToken: String,
  messengerId: String,
  messengerToken: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
