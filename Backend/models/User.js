const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});


module.exports = mongoose.model('User', UserSchema)