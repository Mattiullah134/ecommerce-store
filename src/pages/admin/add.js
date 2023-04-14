import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from 'components/theme/theme';
import FullLayout from 'components/layouts/FullLayout';
import BaseCard from "../../../components/baseCard/BaseCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {
    Grid,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import axios from 'axios';

const AddProducts = () => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [size, setSize] = useState('')
    const [availableQuantity, setAvailableQuantity] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
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
    const submitAddProHandler = async (e) => {
        e.preventDefault();
        console.log(title, slug, desc, imageUrl, size, color, price, category, availableQuantity);
        const addProduct = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addproduct`, {
            title, slug, desc, imageUrl, size, color, price, category, availableQuantity
        });
        if (addProduct.status === 200) {
            toast('product added succcessfully')
            setTitle('');
            setSlug('');
            setDesc('');
            setCategory('');
            setImageUrl('');
            setSize('');
            setAvailableQuantity('');
            setColor('');
            setPrice('');

        } else {
            toast('Something went wrong. Please refresh the page')

        }
        console.log(addProduct);
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
                        <BaseCard title="Add Products" >
                            <Stack spacing={3}>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="title"
                                    type="text"
                                    variant="outlined"

                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField
                                    id="category"
                                    name="category"
                                    label="category"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField
                                    id="slug"
                                    name="slug"
                                    label="slug"
                                    type="text"
                                    variant="outlined"
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
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="imageurl"
                                    name="imageurl"
                                    label="image url"
                                    type='text'
                                    variant="outlined"
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="size"
                                    name="size"
                                    label="Size"
                                    type='text'
                                    variant="outlined"
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="color"
                                    name="color"
                                    label="Color"
                                    type='text'
                                    variant="outlined"
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="price"
                                    name="price"
                                    label="Price"
                                    type='Number'
                                    variant="outlined"
                                    onChange={(e) => handleInput(e)}
                                />
                                <TextField

                                    id="availableqty"
                                    name="availableqty"
                                    label="Available Qty"
                                    type='Number'
                                    variant="outlined"
                                    onChange={(e) => handleInput(e)}
                                />

                            </Stack>

                            <Button onClick={submitAddProHandler} className='mt-5 ml-auto' variant="outlined">Add Product</Button>
                        </BaseCard>
                    </Grid>

                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default AddProducts
