import { useRouter } from 'next/router'
import React, { useState } from 'react'
import mongoose from 'mongoose';

import Order from '../../models/Order';
const MyOrder = ({ order }) => {
    const [proImg, setProImg] = useState('')
    const products = order.products;


    const handleImage = (img) => {

        setProImg(img)
    }
    return (
        <div className='min-h-screen'>
            <section className="text-gray-600 max-sm:mt-24 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">HassanElectric's</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 max-sm:text-lg">Order Id : {order._id}</h1>

                            <p className="leading-relaxed mb-4">Your order have been successfully. <span className='font-bold'>Payment status is {order.status}</span></p>
                            <div className="flex mb-4">
                                <a className="flex-grow text-indigo-500 text-center  py-2 text-lg px-1">Name</a>
                                <a className="flex-grow  border-gray-300 text-center py-2 text-lg px-1">Quantity</a>
                                <a className="flex-grow  border-gray-300 text-center py-2 text-lg px-1">price</a>
                            </div>
                            {Object.keys(products)?.map(key => {
                                return <div key={key} onClick={(e) => handleImage(products[key].img)} className="flex cursor-pointer justify-center border-t max-sm:text-light border-gray-200 py-2">
                                    <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
                                    <span className="ml-auto text-gray-900">{products[key].itemQuantity}</span>
                                    <span className="ml-auto text-gray-900">{products[key].price}</span>
                                </div>
                            })}
                            <div className='flex max-sm:flex-col justify-between items-center my-3'>
                                <span className='text-2xl font-semibold text-gray-900'>Subtotal :<span className='font-normal'>{order.amount} </span></span>
                                <button className="flex items-center justify-center mx-auto mt-2 max-sm:mt-5 text-white bg-indigo-500 border-0 py-2 md:px-4 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">Track Your Order</button>
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-72 h-52 object-contain object-center rounded" src={proImg} />
                    </div>
                </div>
            </section>
        </div>
    )
}
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let order = await Order.findById({ _id: context.query.id });
    console.log(order);
    return {
        props: { order: JSON.parse(JSON.stringify(order)) }
    }
}
export default MyOrder
