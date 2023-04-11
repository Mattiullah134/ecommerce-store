import Order from '../../../models/Order';
import connectDb from "middleware/config"
const jwt = require('jsonwebtoken');
const handler = async (req, res) => {
    const email = req.body.email;

    let orders = await Order.find({ email });

    res.status(200).json(orders)
}
export default connectDb(handler);