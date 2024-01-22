const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    text : {
        type : String,
        required : [true, 'must provide text']
    },
    resourceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Resource',
        required : [true, 'must provide resource']
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true, 'must provide user']
    },
    author: {
        type: String,
        required: [true, 'must provide author']
    },
    likes : {
        type : Number,
        default : 0
    },
    dislikes : {
        type : Number,
        default : 0
    },
},{
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment


