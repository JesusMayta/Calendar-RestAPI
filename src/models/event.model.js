const { Schema, model } = require('mongoose');

const EventSchema = new Schema({

    title: {
        type: String, required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date, required: true
    },
    end: {
        type: Date, required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User', required: [true, 'El usuario es obligatorio']
    }
}, {
    versionKey: false,
});

EventSchema.method('toJSON', function () {
    const { _id, ...event } = this.toObject();
    event.id = _id;
    return event;
});

module.exports = model('Event', EventSchema);