const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res) => {
  const team = new Team({ name: req.body.name, createdBy: req.user.id, members: [req.user.id] });
  await team.save();
  res.json(team);
};

exports.addMember = async (req, res) => {
  const { teamId, userId } = req.body;
  const team = await Team.findByIdAndUpdate(teamId, { $addToSet: { members: userId } }, { new: true });
  res.json(team);
};
