// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import User from "models/User"
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
    try {

        if (req.method === 'POST') {
            const { name, email, password } = req.body;
            let user = new User({ name, email, password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString() });
            const response = await user.save();

            res.status(200).send(response)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}
export default connectDb(handler);
