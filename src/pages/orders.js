
import { Router, useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


const Orders = () => {
    const router = new useRouter();
    const [myOrders, setMyOrders] = useState([])
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('myuser'))
        if (!token) {
            router.push('/')

        } else {

            const getUserOrders = async () => {

                let userOrders = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, { email: token.email })
                setMyOrders(userOrders.data);
            }
            getUserOrders();
        }
    }, [router.query])
    return (
        <div className='mt-24  font-semibold mx-auto md:w-10/12'>
            <p className='text-xl text-center p-5 '>Orders Summary</p>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">id</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Amount</th>
                                        <th scope="col" className="px-6 py-4">link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myOrders?.map(order => {
                                            return <tr key={order._id}
                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-50 cursor-pointer">

                                                <td className="whitespace-nowrap px-6 py-4 font-semibold">{order._id}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{order.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{order.amount}</td>
                                                <Link href={`/order?id=${order._id}`} className="whitespace-nowrap text-blue-400 hover:text-blue-700 px-6 py-4">Details</Link>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders;
