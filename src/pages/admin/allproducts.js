import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from 'components/theme/theme';
import FullLayout from 'components/layouts/FullLayout';
import { Grid } from '@mui/material';
import AllProducts from 'components/dashboard/AllProducts';
import Products from 'models/Products';
import mongoose from 'mongoose';
const AllProduct = ({ product }) => {
    console.log(product);
    return (
        <ThemeProvider theme={theme}>
            
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <AllProducts product={product} />
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
    let product = await Products.find();
    console.log(product);
    return {
        props: { product: JSON.parse(JSON.stringify(product)) }
    }
}
export default AllProduct
