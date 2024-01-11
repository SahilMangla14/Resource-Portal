const mongoose = require('mongoose')

const ResourceSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'must provide name']
    },
    link : {
        type: String,
        required : [true, 'must provide link']
    },
    year: {
        type: Number,
        required : [true, 'must provide year']
    },
    semester: {
        type: String,
        required : [true, 'must provide semester']
    },
    courseCode: {
        type: String,
        required : [true, 'must provide course code']
    },
    description: {
        type: String,
        default: function () {
            return `Resource of course ${this.courseCode || 'unknown'}`;
        }
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Resource', ResourceSchema)


