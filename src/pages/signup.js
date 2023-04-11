import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const router = new useRouter();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const inputValueChangeHandler = (e) => {
        if (e.target.name === 'fullname') {
            setUserName(e.target.value)
        } else if (e.target.name === 'email') {
            setUserEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setUserPassword(e.target.value)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])
    const submitHandler = async (e) => {
        e.preventDefault();
        const formBody = {
            name: userName,
            email: userEmail,
            password: userPassword
        }
        const userDataResponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formBody),
        });
        const newUserData = await userDataResponse.json();
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        if (newUserData.error) {
            toast.error('Internal server error', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast('New User Added successfully', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.log(newUserData);
        }
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
            <div className="bg-grey-lighter min-h-screen flex flex-col mt-12">
                <form onSubmit={(e) => submitHandler(e)} className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            onChange={(e) => inputValueChangeHandler(e)}
                            value={userName}
                            required
                        />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => inputValueChangeHandler(e)}
                            value={userEmail}
                            required
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => inputValueChangeHandler(e)}
                            value={userPassword}
                            required
                        />

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-indigo-600  text-white hover:bg-indigo-500  focus:outline-none my-1"
                        >Create Account</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <Link className="no-underline border-b border-blue text-blue" href={"/login"}>
                            Log in
                        </Link>.
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
