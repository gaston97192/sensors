const { response, request } = require('express');
const Sensor = require('../models/sensor')
const Event = require('../models/event')



const sensorsGet = async(req = request, res = response) => {

    // const {limit = 5, since = 0} = req.query;

    const sensors = await Sensor.find()
    // .limit(Number(limit))
    // .skip(Number(since))

    const total = await Sensor.countDocuments();

    res.json({
        data: sensors,
        total
    });
}


const sensorsGetById = async(req = request, res = response) => {

    let sensorId = req.params.id

    const sensors = await Sensor.findById(sensorId)

    res.json({
        data: sensors,
    });
}


const getEventsOfSensor = async(req = request, res = response) => {

    let sensorId = req.params.sensorId

    const events = await Event.find({sensorId: sensorId})

    res.json({
        data: events,
    });
}

const sensorsSave = async(req, res = response) => {

    const body = req.body;
    const sensor = new Sensor(body);

    await sensor.save();

    res.json({
        data:sensor
    });
}

const sensorsUpdate = async(req, res = response) => {

    const { id } = req.params;
    const body = req.body

    const sensor = await Sensor.findByIdAndUpdate(id, body, {new:true});

    res.json({
        data:sensor
    });
}


const sensorsDelete = async(req, res = response) => {
    const id = req.params.id;
    const sensor = await Sensor.findByIdAndDelete( id );
    const events = await Event.find({sensorId: id});

    for (const event of events) {
       await  Event.findByIdAndDelete(event._id)
    }

    res.json({
        data: sensor
    });
}


module.exports = {
    sensorsGet,
    sensorsGetById,
    sensorsSave,
    sensorsUpdate,
    sensorsDelete,
    getEventsOfSensor
}