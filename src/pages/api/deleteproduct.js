// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import Product from "models/Products"


const handler = async (req, res) => {

    if (req.method === 'POST') {
        let p = await Product.deleteOne({ _id: req.body.id });
        console.log(p);
        res.status(200).send({ success: 'product deleted successfully', products: p })
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);
