import React, { useEffect, useState } from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Checkout = ({ user, cart, clearCart, addToCart, removeToCart, subTotal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPinCode] = useState('');
    console.log(user);
    const { push } = useRouter();
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        if (user.value) {
            setEmail(user.email)
        }
    }, [])
    const inputValueHandeler = async (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name === 'pincode') {
            setPinCode(e.target.value)
            if (e.target.value.length === 5) {
                const validPinCode = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
                const validPinCodeJson = await validPinCode.data;
                if (Object.keys(validPinCodeJson).includes(e.target.value)) {
                    setCity(validPinCodeJson[e.target.value][0])
                    setState(validPinCodeJson[e.target.value][1])
                    setDisabled(false);
                } else {
                    setCity('')
                    setState('')
                    setDisabled(true);

                }
            }
            else {
                setDisabled(true);
                setCity('')
                setState('')

            }

        }


        if (name && email && address && phone && city && state && pincode) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }


    const handleOrder = async (e) => {
        e.preventDefault();
        console.log(subTotal, name, address, phone, pincode, city);
        if (Object.keys(cart).length !== 0 && email && address && pincode) {

            const data = { cart, subTotal, name, email, address, phone, pincode }

            const sendData = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, data);
            console.log(sendData);
            if (sendData.status === 200) {
                clearCart()
                toast("Order Place successfully")
                // setName('')
                // setEmail('')
                // setAddress('')
                // setPhone('')
                // setPinCode('')
                // setCity('')
                // setState('')
                // push('/orders')

            } else if (sendData.status === 400) {
                console.log('hi from the 400 error');
                clearCart()
                toast('Something went wrong')
            }
        } else {
            toast("fill the fields")
        }
    }
    return (
        <div className='container mx-8 max-sm:mx-0 md:m-auto  p-10'>
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
            <h1 className='text-bold text-3xl my-8 text-center'>Checkout</h1>
            <h2 className='text-semi text-xl'>1.Delivery detail</h2>
            <div className="mx-auto max-sm:flex-col flex">
                <div className="px-2 max-sm:w-full w-1/2 ">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input required value={name} onChange={inputValueHandeler} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 max-sm:w-full w-1/2 ">
                    <div className=" mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        {user.value ? <input required onChange={inputValueHandeler} value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input required value={email} onChange={inputValueHandeler} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

                    </div>
                </div>
            </div>

            <div className="px-2  w-full">
                <div className=" mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea value={address} onChange={inputValueHandeler} id="address" name="address" cols="30" rows="10" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" ></textarea>
                </div>
            </div>
            <div className="mx-auto max-sm:flex-col flex">
                <div className="px-2 max-sm:w-full w-1/2 ">
                    <div className=" mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input required value={phone} onChange={inputValueHandeler} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 max-sm:w-full w-1/2 ">

                    <div className=" mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                        <input required onChange={inputValueHandeler} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>
            <div className="mx-auto max-sm:flex-col flex">
                <div className="px-2 max-sm:w-full w-1/2 ">
                    <div className=" mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input required value={state} onChange={inputValueHandeler} readOnly={true} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 max-sm:w-full w-1/2 ">
                    <div className=" mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input required value={city} readOnly={true} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>
            <h2 className='text-semi text-xl'>2.Reviews Cart Items</h2>
            <div className="md:w-[100%] max-sm:w-[90%] w-[80%] max-sm:p-2 p-10 ">
                <ol className='list-decimal'>
                    {Object.keys(cart).length === 0 && <div className='my-4 font-normal'>No Items in the cart</div>}
                    {Object.keys(cart)?.map((k) => {
                        return <li key={k}>
                            <div className="flex my-3">

                                <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                                <div className='flex items-center justify-center w-2/3  '><RemoveCircleOutlinedIcon onClick={() => removeToCart(k)} className='mx-2 max-sm:mx-1 text-3xl' />{cart[k].itemQuantity}<AddCircleOutlinedIcon onClick={() => addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)} className='mx-2 max-sm:mx-1 text-3xl' /></div>

                            </div> <hr />

                        </li>
                    })}
                    <h1>{subTotal}</h1>
                </ol>
                <div className="sm:mx-auto max-sm:w-1/2 mx-8 disabled:cursor-not-allowed">

                    <Link href={'/checkout'}><button onClick={handleOrder} disabled={disabled} className="flex items-center justify-center mx-auto mt-2 text-white bg-indigo-500 border-0 py-2 md:px-4 px-2 disabled:cursor-not-allowed disabled:bg-indigo-200 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        Pay : {subTotal}₨</button></Link>
                </div>
            </div>
        </div >
    )
}

export default Checkout
