// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import User from "models/User"
import jwt from 'jsonwebtoken'
const handler = async (req, res) => {
    try {

        if (req.method === 'POST') {
            let token = req.body.token;
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                const user = await User.findOne({ email: decoded.email })

                const { name, email, address, phone, pincode } = user
                return res.status(200).send({ name, email, address, phone, pincode })
            } else {
                return res.status(400).send({ error: true })
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}
export default connectDb(handler);
