import { Router, useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Products from '../../../models/Products'
import mongoose from 'mongoose';
const Product = ({ errorCode, cart, addToCart, product, variants, buyNow }) => {


    const [color, setColor] = useState(product[0].color)
    const [size, setSize] = useState(product[0].size);

    const [disabled, setDisabled] = useState(false)
    console.log(product);
    const router = useRouter()

    const { slug } = router.query;
    const [pin, setPin] = useState('');
    const [serviceAbility, setServiceAbility] = useState(null);

    useEffect(() => {

        if (product[0].availableQuantity === 0) {
            setDisabled(true)
        }

    }, [])

    const handlePin = (e) => {
        setPin(e.target.value)
    }
    const checkServiceAbility = async () => {

        const validPinCode = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const validPinCodeJson = await validPinCode.data;


        if (pin.length !== 0) {

            if (Object.keys(validPinCodeJson).includes(pin)) {
                toast("Product can deliever at your address")
                setServiceAbility(true);
                setTimeout(() => {
                    setPin('')
                    setServiceAbility(null);
                }, 3000);
            }
            else {
                toast("Sorry Product can not be deliever at your address");
                setServiceAbility(false);
                setTimeout(() => {
                    setServiceAbility(null);
                }, 3000);
            }
        } else {
            return
        }
    }
    const refreshVariants = (newSize, newColor) => {
        console.log(newSize, newColor);
        if (newSize && newColor) {

            let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]}`
            router.push(url)
        }
    }

    // if (errorCode === 404) {
    //     return <Error statusCode={errorCode} />
    // }

    return <>
        <section className="text-gray-600 body-font overflow-hidden md:mt-5 mt-10">
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container min-h-screen px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="object-contain object-top h-[50vh] m-auto block cursor-pointer hover:scale-105 transition-transform" src={product[0].img} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product[0]?.title} {color}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{product[0]?.desc}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>

                                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button className={`border-2  bg-red-700 mx-1  rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('Green') && Object.keys(variants['Green']).includes(size) && <button className={`border-2  bg-green-700 mx-1  rounded-full w-6 h-6 focus:outline-none ${color === 'Green' ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(size) && <button className={`border-2  bg-blue-700 mx-1 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('White') && Object.keys(variants['White']).includes(size) && <button className={`border-2  bg-gray-100 mx-1 rounded-full w-6 h-6 focus:outline-none ${color === 'White' ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(size) && <button className={`border-2  bg-black mx-1 rounded-full w-6 h-6 focus:outline-none ${color === 'Black' ? 'border-black' : 'border-gray-300'}`}></button>}

                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select value={size} onChange={(e) => { refreshVariants(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                        <option value={''}>----Choose Options</option>
                                        {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                                        {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                                        {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                                        {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                                        {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                                        {Object.keys(variants[color]).includes('XXXL') && <option value={'XXXL'}>XXXL</option>}

                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900"> {!disabled ? `RS : ${product[0].price}` : <span className='text-red-600'>Out of stock</span>}</span>
                            <button disabled={disabled} onClick={() => buyNow(slug, 1, product[0].price, product[0].img, product[0].title, size, color)} className="flex ml-auto text-white bg-indigo-500 disabled:bg-indigo-200 disabled:cursor-not-allowed border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                            <button disabled={disabled} onClick={() => {
                                addToCart(slug, 1, product[0].price, product[0].title, product[0].img, size, color)
                                toast("Product add to the cart")
                            }} className="flex ml-auto text-white bg-indigo-500 disabled:bg-indigo-200 disabled:cursor-not-allowed border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>

                        </div>
                        {!disabled && <div className="relative mb-4 pn">
                            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input onChange={handlePin} value={pin} type="text" id="pincode" placeholder='enter the pincode' name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <button onClick={checkServiceAbility} className=" absolute top-7 right-0 flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
                        </div>}
                        {serviceAbility && serviceAbility != null && < p > Product can deliver in this pincode</p>}
                        {!serviceAbility && serviceAbility != null && <p className='text-red-800'> Sorry we cannot deliver the produt in this pincode</p>}
                    </div>
                </div>
            </div>
        </section >
    </>
}
export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Products.find({ slug: context.query.slug });
    let variants = await Products.find({ title: product[0].title });
    const colorSizeSlug = {};
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        } else {
            colorSizeSlug[item.color] = {};
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }
    return {
        props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }
    }
}
export default Product
// let tshirts = {};
// for (let item of products) {
//     // check the title in the tshirts
//     if (item.title in tshirts) {
//         if (!tshirts[item.title].color.includes(item.color) && item.availableQuantity > 0) {
//             tshirts[item.title].color.push(item.color);
//         }
//         if (!tshirts[item.title].size.includes(item.size) && item.availableQuantity > 0) {
//             tshirts[item.title].size.push(item.size);
//         }
//     } else {
//         tshirts[item.title] = JSON.parse(JSON.stringify(item));
//         if (item.availableQuantity > 0) {
//             tshirts[item.title].color = [item.color];
//             tshirts[item.title].size = [item.size];
//         }
//     }
// }
