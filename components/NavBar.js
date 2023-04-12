import Link from 'next/link'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NavBar = ({ logout, user, cart, addToCart, removeToCart, clearCart, subTotal }) => {
    const router = useRouter();
    const [dropDown, setDropDown] = useState(false);
    const [sideBar, setSideBar] = useState(true)
    const ref = useRef()
    useEffect(() => {
        // Object.keys(cart).length !== 0 && setSideBar(false)
        let exempted = ['/checkout', '/orders', '/order', '/myaccount']
        if (exempted.includes(router.pathname)) {
            setSideBar(false)
        }

    }, [])

    // console.log(user);
    const toggleCart = () => {
        setSideBar(!sideBar)
        // if (ref.current.classList.contains('translate-x-full')) {
        //     ref.current.classList.remove('translate-x-full');
        //     ref.current.classList.add('translate-x-0');
        // } else if (!ref.current.classList.contains('translate-x-full')) {
        //     ref.current.classList.remove('translate-x-0');
        //     ref.current.classList.add('translate-x-full');
        // }
    }
    const logoutHandler = () => {
        logout();
        toast('Logout successfully', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }

    return (
        <div>
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
            <header className="text-gray-600 bg-slate-50 z-20 body-font shadow-xl mb-1 fixed top-0 right-0 left-0">
                <div className="container mx-auto flex p-2 md:flex-row flex-col items-center justify-start max-sm:gap-1 gap-5 ">
                    <div className="flex title-font font-medium items-center text-gray-900 mb-4 max-sm:mr-auto md:mb-0 ">
                        <Link href={'/'}><img src="/ecommLogo.png" width={50} alt="" /></Link>
                        <span className="ml-3 max-sm:text-sm text-xl">HassanElectric's</span>
                    </div>
                    <nav className=" flex flex-wrap items-center text-base justify-center text-center">
                        <Link href={'/tshirts'}>
                            <li className="mr-5 list-none cursor-pointer hover:text-gray-900">Tshirts</li>
                        </Link>
                        <Link href={'/hoodies'}>
                            <li className="mr-5 list-none cursor-pointer hover:text-gray-900">Hoodies</li>
                        </Link>
                        <Link href={'/stickers'}>
                            <li className="mr-5 list-none cursor-pointer hover:text-gray-900">Stickers</li>
                        </Link>
                        <Link href={'/mugs'}>
                            <li className="mr-5 list-none cursor-pointer hover:text-gray-900">Mugs</li>
                        </Link>
                    </nav>
                    <div className='cart absolute top-5 right-5 flex items-center cursor-pointer' >
                        <span onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>

                            {user.value &&
                                <div className="relative w-8 h-8 object-contain object-center overflow-hidden bg-gray-100 rounded-full flex items-center mr-2 dark:bg-gray-600">
                                    <svg className="object-center w-12 h-12 text-gray-400  -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                </div>
                            }
                            {dropDown && <div onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className=' bg-slate-800 shadow-lg absolute right-3 top-8 rounded-md w-40'>

                                <ul className="py-2 text-sm text-black dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                    <Link href={'/myaccount'}><li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Account
                                    </li>
                                    </Link>
                                    <Link href={'/orders'}><li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Order
                                    </li>
                                    </Link>
                                    <li onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Logout
                                    </li>

                                </ul>
                            </div>}
                        </span>
                        {!user.value && <Link href={'/login'} >
                            <button className="bg-transparent rounded-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent  mr-2">
                                Login
                            </button>
                        </Link>}
                        <button onClick={toggleCart}><ShoppingCartCheckoutIcon /></button>
                    </div>
                    {Object.keys(cart).length !== 0 && <div ref={ref} className={`md:w-96 h-[100vh] overflow-x-scroll w-80 sideBar absolute top-0 max-sm:w-64  bg-slate-50 p-10 transition-all ${sideBar ? 'right-0' : '-right-96'}`}>
                        <h2 className='font-bold text-xl text-center' >Shoping cart</h2>
                        <span onClick={toggleCart} className='absolute top-4 right-2 cursor-pointer text-xl'><CloseIcon /></span>
                        <ol className='list-decimal'>
                            {Object.keys(cart).length === 0 && <div className='my-4 font-normal'>No Items in the cart</div>}
                            {Object.keys(cart)?.map((k) => {
                                return <li key={k}>
                                    <div className="flex my-3">

                                        <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size}) ({cart[k].variant})</div>
                                        <div className='flex items-center justify-center w-2/3  '><RemoveCircleOutlinedIcon onClick={() => removeToCart(k)} className='mx-2 text-3xl' />{cart[k].itemQuantity}<AddCircleOutlinedIcon onClick={() => addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant)} className='mx-2 text-3xl' /></div>

                                    </div> <hr />

                                </li>
                            })}
                            <h1>{subTotal}</h1>
                        </ol>
                        <div className="flex max-sm:flex-col max-sm:gap-1 gap-2">

                            <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-indigo-100 flex items-center disabled:cursor-not-allowed justify-center mx-auto mt-2 text-white bg-indigo-500 border-0 py-2 md:px-4 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"><ShoppingBagIcon />
                                Checkout</button></Link>
                            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="flex disabled:bg-indigo-100 disabled:cursor-not-allowed items-center justify-center mx-auto mt-2 text-white bg-indigo-500 border-0 py-2 md:px-4 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">Clear Cart</button>
                        </div>
                    </div>}
                </div >
            </header >
        </div >
    )
}

export default NavBar


