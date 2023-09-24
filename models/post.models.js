const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.ObjectId,
        required: true,
    }
}, {timestamps:true})

const PostModel = model('posts', PostSchema);

module.exports = {PostModel};