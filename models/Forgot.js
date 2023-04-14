const mongoose = require('mongoose');

const ForgotPassSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },


}, { timestamps: true });
mongoose.models = {}

export default mongoose.model('Forgot', ForgotPassSchema);