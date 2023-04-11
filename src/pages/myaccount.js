import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

const MyAccount = () => {
    const router = new useRouter();
    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
            router.push('/')

        }
    }, [router.query])
    return (
        <div className='mt-20'>
            this is the my account page
        </div>
    )
}

export default MyAccount
