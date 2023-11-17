const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);