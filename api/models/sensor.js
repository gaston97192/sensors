const { Schema, model } = require('mongoose');

const SensorSchema = Schema({
    name: { type: String, required: true },
    location: {
        lat: { type: Number },
        long: { type: Number }
    },
    active: {type: Boolean, default: false },
    minVal: {type: Number, required: true  },
    maxVal: {type: Number, required: true  }
})

module.exports = model( 'Sensor', SensorSchema );