const { Schema, model } = require('mongoose');

const SensorSchema = Schema({
    id: { type: String },
    name: { type: String, required: true },
    location: {
        lat: { type: Number },
        long: { type: Number }
    },
    active: {type: Boolean, default: true },
    minVal: {type: Number, required: true  },
    maxVal: {type: Number, required: true  }
})

module.exports = model( 'Sensor', SensorSchema );