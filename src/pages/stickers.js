import Link from 'next/link'
import React from 'react';
import Product from '../../models/Products'
import mongoose from 'mongoose';
const Stickers = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font p-5">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {
                            products ? Object.keys(products)?.map(key => {
                                return <div key={products[key]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm m-2">
                                    <Link href={`/product/${products[key].slug}`}>


                                        <div className="block relative border rounded overflow-hidden">
                                            <img alt="ecommerce" className="object-contain object-top h-[50vh] m-auto block hover:scale-105 transition-all" src={products[key].img} />
                                        </div>
                                        <div className="mt-4 text-center md:text-left">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[key].title}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{products[key].desc.length > 0 ? `${products[key].desc.slice(0, 30)}...` : products[key].desc}</h2>
                                            <p className="mt-1">₨:{products[key].price}</p>
                                            <div className="mt-1 cursor-pointer">
                                                {products[key].size.includes('S') && <span className='mx-1 border border-gray-300 px-1'>S</span>}
                                                {products[key].size.includes('M') && <span className='mx-1 border border-gray-300 px-1'>M</span>}
                                                {products[key].size.includes('L') && <span className='mx-1 border border-gray-300 px-1'>L</span>}
                                                {products[key].size.includes('XL') && <span className='mx-1 border border-gray-300 px-1'>XL</span>}
                                                {products[key].size.includes('XXL') && <span className='mx-1 border border-gray-300 px-1'>XXL</span>}
                                                {products[key].size.includes('XXXL') && <span className='mx-1 border border-gray-300 px-1'>XXXL</span>}

                                            </div>
                                            <div className="mt-1 cursor-pointer">
                                                {products[key].color.includes('red') && <button className="border-2 bg-red-700 mx-1  rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[key].color.includes('Green') && <button className="border-2 bg-green-700 mx-1  rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[key].color.includes('Blue') && <button className="border-2 bg-blue-700 mx-1 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[key].color.includes('White') && <button className="border-2 bg-gray-100 mx-1 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[key].color.includes('Black') && <button className="border-2 bg-black mx-1 rounded-full w-6 h-6 focus:outline-none"></button>}


                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            }) : <h1>Currently Products unavailable</h1>
                        }

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
    let products = await Product.find({ category: 'stickers' });
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
    console.log(JSON.parse(JSON.stringify(tshirts)));
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
    }
}
export default Stickers
