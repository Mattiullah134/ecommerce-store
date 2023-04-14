// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import Product from "models/Products"


const handler = async (req, res) => {
    if (req.method === 'POST') {
        let p = await Product.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).send({ success: 'Data update successfully', products: p })
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);
