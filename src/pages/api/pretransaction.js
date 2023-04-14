import connectDb from "middleware/config"
import Order from "models/Order";
import Products from "models/Products";
const handler = async (req, res) => {

    if (req.method === 'POST') {
        const { cart, subTotal, name, email, address, phone, pincode, city, state } = req.body;
        let product, sumTotal = 0;

        // check if the cart is tempered --[done]

        Object.entries(cart).forEach(async ([key, value]) => {
            sumTotal += cart[key].price * cart[key].itemQuantity
            product = await Products.find({ slug: key })
            // check if the cart item is out of stock --[pending]
            if (product[0].availableQuantity < cart[key].itemQuantity) {
                res.status(400).send({ "success": false, "error": "Some item went out of stock.Please try again" }); return;
            }
            if (product[0].price !== cart[key].price) {
                res.status(200).send({ "success": false, "error": "price of the some cart has been change" });
                return;

            }

            product = await Products.findOneAndUpdate({ slug: key }, {
                $inc: {

                    "availableQuantity": -cart[key].itemQuantity,
                }
            })
        });
        if (sumTotal !== subTotal) {
            res.status(404).send({ "error": 'total of cart product is change' })
            return;
        }

        // check if the details are valid like email , address etc --[pending]

        if (cart) {

            let order = new Order({
                email, address, products: cart, amount: subTotal, name, phone, pincode, city, state
            })

            const saveOrder = await order.save();
            res.status(200).send('/order?=' + saveOrder._id);
            return;

        }
    }

}
export default connectDb(handler);