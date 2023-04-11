// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import User from "models/User"

const jwt = require('jsonwebtoken');
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const handler = async (req, res) => {
    try {

        if (req.method === 'POST') {
            const user = await User.findOne({ email: req.body.email });

            if (user) {
                if (req.body.email === user.email && req.body.password === CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)) {
                    const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2d' });
                    res.status(200).send({ success: true, email: user.email, name: user.name, token })
                } else {
                    res.status(404).send({ error: 'Invalid credientials', success: false })
                }
            } else {
                res.status(404).send({ error: 'User Not Found', success: false })
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}
export default connectDb(handler);
