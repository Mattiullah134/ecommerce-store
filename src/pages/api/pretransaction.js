import connectDb from "middleware/config"
import Order from "models/Order";
import Products from "models/Products";
const handler = async (req, res) => {

    if (req.method === 'POST') {
        const { cart, subTotal, name, email, address, phone, pincode } = req.body;
        let product, sumTotal = 0;

        // check if the cart is tempered --[done]

        console.log('hi this is the start of the loop');
        Object.entries(cart).forEach(async ([key, value]) => {
            sumTotal += cart[key].price * cart[key].itemQuantity
            product = await Products.find({ slug: key })
            // console.log('product', product);
            // check if the cart item is out of stock --[pending]
            if (product[0].availableQuantity < cart[key].itemQuantity) {
                console.log('out of stock');
                res.status(400).send({ "success": false, "error": "Some item went out of stock.Please try again" }); return;
            }
            if (product[0].price !== cart[key].price) {
                console.log('price xhange hho gaya hai');
                res.status(200).send({ "success": false, "error": "price of the some cart has been change" });
                return;

            }

            product = await Products.findOneAndUpdate({ slug: key }, {
                $inc: {

                    "availableQuantity": -cart[key].itemQuantity,
                }
            })
            console.log('update product', product);
        });
        console.log('hi this is the end of the loop');
        // console.log('after checking the tempering');
        // console.log("sumTotal", sumTotal);
        if (sumTotal !== subTotal) {
            console.log('total xhange hho gaya hai');
            res.status(404).send({ "error": 'total of cart product is change' })
            return;
        }

        // check if the details are valid like email , address etc --[pending]

        if (cart) {
            console.log('thsi is the order page');

            let order = new Order({
                email, address, products: cart, amount: subTotal, name, phone,
            })

            const saveOrder = await order.save();
            res.status(200).send('/order?=' + saveOrder._id);
            return;

        }
    }

}
export default connectDb(handler);