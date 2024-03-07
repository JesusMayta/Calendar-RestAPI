const { request, response } = require('express');
const { Event } = require('../models');

const GetEvents = async (req, res = response) => {

    try {

        const [total, events] = await Promise.all([
            Event.countDocuments(),
            Event.find().populate('user', ['name', 'id', 'email'])
        ]);

        res.json({
            ok: true,
            total,
            events
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error in get all events, please talk with administrator'
        });
    };
};

const CreateEvent = async (req = request, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        await event.save();

        res.status(201).json({
            ok: true,
            event
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error saving event, please talk with administrator'
        });
    };
};

const UpdateEvent = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const event = await Event.findById(id);

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not user that modified this event'
            });
        };

        const newEvent = {
            ...req.body,
            user: req.uid
        };

        const updateEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        res.json({
            ok: true,
            event: updateEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to update event, please talk with administrator'
        });
    };
};

const DeleteEvent = async (req = request, res = response) => {

    const id = req.params.id;

    try {

        const event = await Event.findById(id);

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You cannot eliminated this event, you are not created this event'
            });
        };

        const deleteEvent = await Event.findByIdAndDelete(id);

        res.json({
            ok: true,
            deleteEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to delete event, please talk with administrator'
        });
    };
};

module.exports = {
    CreateEvent,
    DeleteEvent,
    GetEvents,
    UpdateEvent,
};