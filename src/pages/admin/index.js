import { Grid } from "@mui/material";
import BlogCard from "components/dashboard/BlogCard";
import DailyActivity from "components/dashboard/DailyActivity";
import ProductPerfomance from "components/dashboard/AllProducts";
import SalesOverview from "components/dashboard/SalesOverview";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from 'components/theme/theme';
import FullLayout from 'components/layouts/FullLayout';
export default function Admin() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview />
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProductPerfomance />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <BlogCard />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}
