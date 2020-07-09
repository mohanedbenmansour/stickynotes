const user = require('../models/user.model');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
module.exports.register = (req, res, next) => {
  let newUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save((err, user) => {
    if (err) res.status(500).json({ errmsg: err });
    res.status(200).json({ msg: user });
  });
};

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};
//return user from db
module.exports.getUser = (req, res, next) => {
  user.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: 'User not found.' });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ['name', 'email', '_id']) });
  });
};
