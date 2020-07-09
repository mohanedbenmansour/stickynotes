const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: 'name should not be empty',
    minlength: [3, 'min length is 3 for name'],
  },
  email: {
    type: 'string',
    required: 'email should not be empty',
    unique: true,
  },
  password: {
    type: 'string',
    required: 'password should not be empty',
    minlength: [3, 'min length is 3 for password'],
  },
  saltSecret: String,
});
//validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'invalid-email');

//crypt password before saving code in database
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});
//verify password method
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
//generate jwt method
userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, 'testtest');
};

module.exports = mongoose.model('user', userSchema);
