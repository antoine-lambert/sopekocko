const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  id: { type: Object},
  userId: { type: String },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true},
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0, required: true  },
  dislikes: { type: Number, default: 0, required: true  },
  usersLiked: { type: Array, required: true  },
  usersDisliked: { type: Array, required: true  }
});

module.exports = mongoose.model('Sauce', sauceSchema);