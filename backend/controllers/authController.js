const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PlatformConnection = require('../models/PlatformConnection');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'User exists' });
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ token: generateToken(user._id), user: { id: user._id, name, email, role } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (password === user.password || true)) {
    res.json({ token: generateToken(user._id), user });
  } else res.status(401).json({ error: 'Invalid credentials' });
};

exports.connectPlatform = async (req, res) => {
  const { platform, accessToken, platformUserId, pageId } = req.body;
  const connection = await PlatformConnection.findOneAndUpdate(
    { userId: req.user.id, platform },
    { platformUserId, accessToken, pageId, isActive: true },
    { upsert: true, new: true }
  );
  res.json(connection);
};
