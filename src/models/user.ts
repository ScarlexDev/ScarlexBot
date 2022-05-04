import mongoose from 'mongoose';
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  isBlacklisted: {
    type: Boolean,
    required: false,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now()
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: String,
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
    succesfullRequests: {
      type: Number,
      required: false,
      default: 0,
    },
    failedRequests: {
      type: Number,
      required: false,
      default: 0,
    },
    recentRequests: {
      type: Array,
      required: false,
      default: [],
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


const Users = mongoose.model('Users', UserSchema);
export default  Users;
