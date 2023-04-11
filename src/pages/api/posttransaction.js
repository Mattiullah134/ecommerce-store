
import connectDb from "middleware/config"
import Order from "models/Order";

const handler = async (req, res) => {
    res.status(200).json(req.body)
}
export default connectDb(handler);