import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from 'components/theme/theme';
import FullLayout from 'components/layouts/FullLayout';
import BaseCard from "../../../components/baseCard/BaseCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from 'models/Products';
import mongoose from 'mongoose';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
const editproduct = ({ product }) => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [size, setSize] = useState('')
    const [availableQuantity, setAvailableQuantity] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
    useEffect(() => {
        console.log(product);
        setTitle(product.title);
        setSlug(product.slug);
        setDesc(product.desc);
        setCategory(product.category);
        setImageUrl(product.img);
        setSize(product.size);
        setAvailableQuantity(product.availableQuantity);
        setColor(product.color);
        setPrice(product.price);
    }, [])
    const handleInput = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'slug') {
            setSlug(e.target.value)
        }
        else if (e.target.name === 'desc') {
            setDesc(e.target.value)
        }
        else if (e.target.name === 'imageurl') {
            setImageUrl(e.target.value)
        }
        else if (e.target.name === 'size') {
            setSize(e.target.value)
        }
        else if (e.target.name === 'color') {
            setColor(e.target.value)
        }
        else if (e.target.name === 'price') {
            setPrice(e.target.value)
        }
        else if (e.target.name === 'category') {
            setCategory(e.target.value)
        }
        else if (e.target.name === 'availableqty') {
            setAvailableQuantity(e.target.value)
        }
    }
    const submitEditProHandler = async (e) => {
        e.preventDefault();
        console.log(title, slug, desc, imageUrl, size, color, price, category, availableQuantity);
        const editProduct = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateproduct`, {
            id: product._id, title, slug, desc, imageUrl, size, color, price, category, availableQuantity: +availableQuantity
        });
        console.log(editProduct);
        if (editProduct.status === 200) {
            toast(editProduct.data.success)
            router.push(`/admin/editproduct?id=${product._id}`);
        } else {
            toast('Something went wrong. Please refresh the page')

        }

    }
    const submitDeleteHandler = async (e, id) => {
        e.preventDefault();
        console.log(id);
        let deltePro = window.confirm('do you really want to delete the product');
        console.log(deltePro);
        if (deltePro) {

            const deleteProduct = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/deleteproduct`, {
                id
            });
            if (deleteProduct.status === 200) {
                router.push('/admin/allproducts');
            } else {
                toast(deleteProduct.data.error)
            }
        } else {
            return;
        }
    }
    return (
        <ThemeProvider theme={theme}>
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
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Edit Product" >
                            <img className='w-32 mb-10 mx-auto text-center' src={product.img} alt={product.title} />
                            <Stack spacing={3}>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="title"
                                    type="text"
                                    variant="outlined"

                                    inputProps={{ value: title }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField
                                    id="category"
                                    name="category"
                                    label="category"
                                    type="text"
                                    variant="outlined"
                                    inputProps={{ value: category }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField
                                    id="slug"
                                    name="slug"
                                    label="slug"
                                    type="text"
                                    variant="outlined"
                                    inputProps={{ value: slug }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField
                                    id="desc"
                                    name="desc"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    type="text"
                                    variant="outlined"
                                    inputProps={{ value: desc }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="imageurl"
                                    name="imageurl"
                                    label="image url"
                                    type='text'
                                    variant="outlined"
                                    inputProps={{ value: imageUrl }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="size"
                                    name="size"
                                    label="Size"
                                    type='text'
                                    variant="outlined"
                                    inputProps={{ value: size }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="color"
                                    name="color"
                                    label="Color"
                                    type='text'
                                    variant="outlined"
                                    inputProps={{ value: color }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="price"
                                    name="price"
                                    label="Price"
                                    type='Number'
                                    variant="outlined"
                                    inputProps={{ value: price }}
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="availableqty"
                                    name="availableqty"
                                    label="Available Qty"
                                    type='Number'
                                    variant="outlined"
                                    inputProps={{ value: availableQuantity }}
                                    onChange={(e) => handleInput(e)}
                                />

                            </Stack>
                            <Box className='flex justify-around'>

                                <Button onClick={submitEditProHandler} className='mt-5 ' variant="outlined">Edit</Button>
                                <Button onClick={(e) => submitDeleteHandler(e, product._id)} className='mt-5 ' variant="outlined" color="error">Delete</Button>
                            </Box>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}
export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Products.find({ _id: context.query.id });

    return {
        props: { product: JSON.parse(JSON.stringify(product[0])) }
    }
}
export default editproduct
