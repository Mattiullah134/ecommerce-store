import Forgot from "models/Forgot"
import User from "models/User";
const jwt = require('jsonwebtoken');
export default async function handler(req, res) {
    // check if the user exist in the database
    // send an email to the user

    if (req.body.data.sendMail === true) {

        const token = jwt.sign({ email: req.body.data.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })
        let email = `We have sent you this email in response to your request to reset your password on Matti's Store. 
           <br/><br/>

                            To reset your password, please follow the link below:

                            <a href="${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}">Click here to reset your password</a>

                            <br/><br/>

                            We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change your Password".

                            <br/><br/>`
        res.status(200).json({ name: 'John Doe' })
    }
    else {
        let token = req.body.token.token;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOneAndUpdate({ email: decoded.email }, { name: req.body.name, address: req.body.address, pincode: req.body.pincode, phone: req.body.phone })
        const { name, address, pincode, phone } = user;
        return res.status(200).send({ name, address, pincode, phone })
    }
}
