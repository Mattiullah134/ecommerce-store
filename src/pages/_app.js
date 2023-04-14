import '@/styles/globals.css'
import Footer from 'components/Footer'
import NavBar from 'components/NavBar'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState()
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))

    let sbt = 0;
    let keys = Object.keys(cart);
    // for (let i = 0; i < keys.length; i++) {
    Object?.keys(cart)?.map(data => {

      sbt += cart[data]?.price * cart[data]?.itemQuantity;
    })
    // }
    setSubTotal(sbt);
  }
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      localStorage.clear();
    }
    let myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setKey(Math.random());
  }, [router.query])

  const addToCart = (itemCode, itemQuantity, price, name, img, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].itemQuantity = cart[itemCode].itemQuantity + itemQuantity
    } else {
      newCart[itemCode] = { itemQuantity: 1, price, name, size, variant, img }
    }
    setCart(newCart);
    // this is for the saving the cart item in the local storage
    saveCart(newCart)
  }
  const removeToCart = (itemCode) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].itemQuantity = cart[itemCode]?.itemQuantity - 1
    }
    if (newCart[itemCode].itemQuantity <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart)
  }
  const clearCart = () => {
    setCart({});
    saveCart({});
    setSubTotal(0);
  }
  const buyNow = (itemCode, itemQuantity, price, img, name, size, variant) => {
    saveCart({});
    let newCart = {};
    if (itemCode in cart) {
      newCart[itemCode].itemQuantity = cart[itemCode].itemQuantity + itemQuantity
    } else {
      newCart[itemCode] = { itemQuantity: 1, price, name, size, variant, img }
    }
    setCart(newCart);
    // this is for the saving the cart item in the local storage
    saveCart(newCart)
    router.push('/checkout')
  }
  const logout = () => {
    localStorage.removeItem('myuser');
    setKey(Math.random())
    setTimeout(() => {
      setUser({ value: null })
      router.push('/')
    }, 1500);
  }
  return <>
    <LoadingBar
      color='#4B0082'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={180}
    />

    {key && !router.pathname.includes('/admin') && <NavBar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeToCart={removeToCart} clearCart={clearCart} subTotal={subTotal} />}
    <Component user={user} cart={cart} addToCart={addToCart} removeToCart={removeToCart} clearCart={clearCart} buyNow={buyNow} subTotal={subTotal} {...pageProps} />
    {!router.pathname.includes('/admin') && <Footer />}

  </>
}
