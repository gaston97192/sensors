const { response, request } = require('express');
const Event = require('../models/event')


const eventsGet = async(req = request, res = response) => {

    const {limit = 5, since = 0} = req.query;

    const events = await Event.find()
    .limit(Number(limit))
    .skip(Number(since))

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




module.exports = {
    eventsGet,
    eventsSave,
}