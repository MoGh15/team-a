const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  buildingNumber: { type: String, required: true },
  apartNumber: { type: String }, 
  postCode: { type: Number, required: true }
}, { _id: false }); 

module.exports = AddressSchema;