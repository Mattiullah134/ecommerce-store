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



const AllProducts = ({ product }) => {
  const router = useRouter();
  const handleNavigation = (e, id) => {
    router.push(`/admin/editproduct?id=${id}`)
  }
  return (
    <BaseCard title="All Products" className='max-sm:overflow-x-scroll'>
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
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Variant
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product?.map((product) => (
            <TableRow className="cursor-pointer" onClick={(e) => handleNavigation(e, product._id)} key={product._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.slug}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <img
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                      className="w-10"
                      src={product.img}
                    />



                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.size}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.color,
                    color: "#fff",
                  }}
                  size="small"
                  label={product.color}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Rs{product.price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
