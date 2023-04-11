// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "middleware/config"
import Product from "models/Products"


const handler = async (req, res) => {
    let products = await Product.find();
    let tshirts = {};
    for (let item of products) {
        // check the title in the tshirts
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQuantity > 0) {
                tshirts[item.title].color.push(item.color);
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQuantity > 0) {
                tshirts[item.title].size.push(item.size);

            }
        } else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQuantity > 0) {
                tshirts[item.title].color = [item.color];
                tshirts[item.title].size = [item.size];
            }
        }
    }
    res.status(200).json({ tshirts })

}
export default connectDb(handler);
