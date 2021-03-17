const { Schema, model } = require('mongoose');

const SensorEventSchema = Schema({
    id: { type: String },
    value: { type: String, required: true },
	sensorId: { type: global.database.mongodb.mongoose.Schema.Types.ObjectId, ref: 'sensor' },

},{ timestamps: true })

module.exports = model( 'SensorEvent', SensorEventSchema );