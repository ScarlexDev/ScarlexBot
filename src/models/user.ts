const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  cryptedPassword: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now()
  },
  api: {
    type: Object,
    key: {
      type: String,
      default: null,
      required: false,
      date: {
        type: Date,
        default: Date.now()
      }
    },
    amount: {
      type: Number,
      required: false,
      default: null,
    },
    required: false,
    default: {
      key: null,
      amount: null
    }
  },
  discord: {
    type: Object,
    required: false,
    default: null
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
