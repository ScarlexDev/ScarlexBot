import mongoose from 'mongoose';
const { model , Schema}  = require("mongoose");
const devSchema = new Schema({
  apiStatus: {
    type: Boolean,
    required: false,
    default: false,
},
disabledEndpoints: {
    type: Array,
    required: false,
    default: [],
},
});

  const Dev = model('Dev', devSchema);
export default  Dev;