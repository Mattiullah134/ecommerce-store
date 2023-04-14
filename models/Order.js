const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        requried: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    }
}, { timestamps: true });
mongoose.models = {}

export default mongoose.model('Order', OrderSchema);