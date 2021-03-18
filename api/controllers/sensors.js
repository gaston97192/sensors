const { response, request } = require('express');
const Sensor = require('../models/sensor')


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

    const sensor = await Sensor.findByIdAndUpdate(id, body);

    res.json({
        data:sensor
    });
}


const sensorsDelete = async(req, res = response) => {
    const id = req.params.id;
    const sensor = await Sensor.findByIdAndDelete( id )

    res.json({
        data: sensor
    });
}


module.exports = {
    sensorsGet,
    sensorsSave,
    sensorsUpdate,
    sensorsDelete,
}