// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import User from "models/User"
import jwt from 'jsonwebtoken'
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            let token = req.body.token.token;
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                if (req.body.password) {

                    const user = await User.findOneAndUpdate({ email: decoded.email }, { name: req.body.name, address: req.body.address, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
                    const { name, address, pincode, phone } = user;
                    return res.status(200).send({ name, address, pincode, phone })
                } else {

                    const user = await User.findOneAndUpdate({ email: decoded.email }, { name: req.body.name, address: req.body.address, pincode: req.body.pincode, phone: req.body.phone })
                    const { name, address, pincode, phone } = user;
                    return res.status(200).send({ name, address, pincode, phone })
                }
            } else {
                return res.status(400).send({ error: true })
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}
export default connectDb(handler);
