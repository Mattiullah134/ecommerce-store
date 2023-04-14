// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import Product from "models/Products"


const handler = async (req, res) => {
    // title, slug, desc, imageUrl, size, color, pric, category, availableQuantity
    if (req.method === 'POST') {
        let p = new Product({
            title: req.body.title,
            slug: req.body.slug,
            desc: req.body.desc,
            img: req.body.imageUrl,
            size: req.body.size,
            color: req.body.color,
            price: req.body.price,
            category: req.body.category,
            availableQuantity: +req.body.availableQuantity
        });
        const saveData = await p.save();
        res.status(200).send(saveData)
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);
