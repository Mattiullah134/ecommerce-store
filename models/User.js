const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        default: ''

    },
    address: {
        type: String,
        default: ''

    },
    pincode: {
        type: Number,
        default: ''

    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
mongoose.models = {}

export default mongoose.model('User', UserSchema);