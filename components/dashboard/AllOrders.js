import React from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useRouter } from "next/router";



const AllOrders = ({ order }) => {
    const router = useRouter();
    const handleNavigation = (e, id) => {
        router.push(`/admin/orderdetail?id=${id}`)
    }
    return (
        <BaseCard title="All Order" className='max-sm:overflow-x-scroll'>
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Id
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                phone
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                amount
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                link
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {order?.map((product) => (
                        <TableRow className="cursor-pointer" onClick={(e) => handleNavigation(e, product._id)} key={product._id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {product.email}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography color="textSecondary" variant="h6">
                                    {product.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h6">
                                    {product.phone}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",

                                    }}
                                    size="small"
                                    label={`Rs:${product.amount}`}
                                ></Chip>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">{product.status}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard>
    );
};

export default AllOrders;
