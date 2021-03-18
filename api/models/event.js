const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    id: { type: String },
    value: { type: Number, required: true },
	sensorId: { type: Schema.Types.ObjectId, ref: 'sensor' }

},{ timestamps: true })

module.exports = model( 'Event', EventSchema );