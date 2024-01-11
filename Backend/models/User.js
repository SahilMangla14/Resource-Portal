const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name']
    },
    role: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: [true, 'must provide email'],
    },
    password: {
        type: String,
        required: [true, 'must provide password'],
    },
    year: {
        type: Number,
        required: [true, 'must provide year']
    },
    rating: {
        type: Number,
        default: 0
    },
    contributedResources: {
        type: Array,
        default: []
    },
    savedResources: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)