// models/Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: String,
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
