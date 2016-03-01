const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true

  },

  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  // Convert mongoose object to JavaScript object -- delete .save .remove ...
  toJson: function () {
    const obj = this.toObject();
    delete obj.password;

    return obj;
  },

  authenticate: function (plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },

  encryptPassword: function (plainTextPword) {
    if (!plainTextPword) {
      return '';
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPword, salt);
  }
};

module.exports = mongoose.model('user', UserSchema);
