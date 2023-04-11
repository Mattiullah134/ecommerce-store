const mongoose = require('mongoose');

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        console.log('connection already exists');
        return handler(req, res)
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log('new connection create');
    return handler(req, res);
}
export default connectDb;