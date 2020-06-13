const mongoose = require('mongoose');
const passwordvalidator = require('password-validator');

const uniqueValidator = require('mongoose-unique-validator');

const passwordSchema = new passwordvalidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

const userSchema = mongoose.Schema({
  email: { type: String, lowercase: true, required: true,
     unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid'], index: true},
  password: { type: String, required: true}});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);