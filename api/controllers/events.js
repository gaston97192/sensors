const { response, request } = require('express');
const Event = require('../models/event')


const eventsGet = async(req = request, res = response) => {

    const {limit = 5, since = 0} = req.query;

    const events = await Event.find()
                              .populate('sensorId')
    const total = await Event.countDocuments();

    res.json({
        data: events,
        total
    });
}

const eventsSave = async(req, res = response) => {

    const body = req.body;
    const event = new Event(body);

    await event.save();

    res.json({
        data:event
    });
}

const eventsUpdate = async(req, res = response) => {

    const { id } = req.params;
    const body = req.body

    const event = await Event.findByIdAndUpdate(id, body,{new:true});

    res.json({
        data:event
    });
}


const eventsDelete = async(req, res = response) => {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete( id )

    res.json({
        data: event
    });
}


const eventsGetById = async(req = request, res = response) => {

    let eventId = req.params.id

    const events = await Event.findById(eventId)
                              .populate('sensorId')

    res.json({
        data: events,
    });
}



module.exports = {
    eventsGet,
    eventsSave,
    eventsGetById,
    eventsDelete,
    eventsUpdate
}