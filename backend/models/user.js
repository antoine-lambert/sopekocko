const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, lowercase: true, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);