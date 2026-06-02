const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  branchNumber: { // mapped to 'n' e.g. "01"
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  incharge: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  tel: {
    type: String
  },
  hours: { // mapped to 'hrs'
    type: String
  },
  email: {
    type: String
  },
  mapsLink: { // mapped to 'maps'
    type: String
  },
  landmark: {
    type: String
  },
  mapCoords: {
    type: String // e.g. "11.2489516,77.5330221"
  },
  images: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
