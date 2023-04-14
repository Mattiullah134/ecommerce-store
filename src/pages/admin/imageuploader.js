import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from 'components/theme/theme';
import FullLayout from 'components/layouts/FullLayout';
const ImageUploader = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
                hi this is the all products page
            </FullLayout>
        </ThemeProvider>
    )
}

export default ImageUploader
