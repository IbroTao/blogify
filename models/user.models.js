const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    pics: {
         type: String,
        required: false,
    },
    bio: {
        type: String,
        maxlength: 350,
    }
},{
    timestamps: true,
});

const UserModel = model('users', UserSchema);

module.exports = {UserModel};