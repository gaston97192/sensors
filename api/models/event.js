const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    value: { type: Number, required: true },
	sensorId: { type: Schema.Types.ObjectId, ref: 'Sensor' }

},{ timestamps: true })

module.exports = model( 'Event', EventSchema );