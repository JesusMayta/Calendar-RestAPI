const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    name: {
        type: String, required: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    password: {
        type: String, required: true
    }
}, {
    versionKey: false,
});

UserSchema.method('toJSON', function () {
    const { _id, ...user } = this.toObject();
    user.id = _id;
    return user;
});

module.exports = model('User', UserSchema);