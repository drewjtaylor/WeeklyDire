const mongoose = require('mongoose');
const {Schema} = mongoose;

const articleSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String // A url for an image
    },
    tags: {
        type: Array,
        default: []
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
});

module.exports = mongoose.model('Article', articleSchema);