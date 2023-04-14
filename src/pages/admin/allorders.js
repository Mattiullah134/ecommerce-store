import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from 'components/theme/theme';
import FullLayout from 'components/layouts/FullLayout';
import { Grid } from '@mui/material';
import AllOrders from 'components/dashboard/AllOrders';
import Orders from 'models/Order';
Orders
import mongoose from 'mongoose';
const AllOrder = ({ order }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <AllOrders order={order} />
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
    let order = await Orders.find();
    console.log(order);
    return {
        props: { order: JSON.parse(JSON.stringify(order)) }
    }
}
export default AllOrder
