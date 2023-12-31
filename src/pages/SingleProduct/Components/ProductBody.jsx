import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import ProductRating from './ProductRating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

function ProductBody({ item }) {
    const data = {
        "_id": "64fcb3ba8ab402a306042132",
        "productName": "aaa",
        "brand": "bbbb",
        "productPicture": [
            "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-28.jpg",
            "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-28.jpg,",
            "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-28.jpg, ",
            "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-28.jpg, https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-37-346x310.jpg"
        ],
        "description": "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        "weight": "242",
        "price": 2323,
        "countInStock": 32,
        "productCode": "3ewdsd",
        "discount": 12,
        "manufacturingDate": "2023-09-21T00:00:00.000Z",
        "expiredDate": "2023-09-20T00:00:00.000Z",
        "type": "Recommended",
        "productPlan": "Recommended",
        "status": "In Stock",
        "review": [],
        "subcategory": "64e97b5afc2163dda07d08b6",
        "category": "64e978b1fc2163dda07d085f",
        "addedBy": "64c5cd6dfad70897e1500eea",
        "createdAt": "2023-09-09T18:04:42.028Z",
        "updatedAt": "2023-09-09T18:04:42.028Z",
        "__v": 0
    }
    return (
        <Box>
            <Typography sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
            }}>
                {item?.productName}
            </Typography>
            <Box sx={{
                display: "flex",
                // justifyContent: "left",
                // '& > *': {
                //      // Apply font size to all direct children
                // },
                alignItems: "center"
            }}>
                <Typography sx={{
                    fontSize: '.8rem',
                    borderRight: "1px solid #9ba3cc", paddingRight: '0.5rem',
                }} mr={1}>
                    <span style={{
                        color: "#9ba3cc",

                    }}> Brands: </span>{item?.brand}
                </Typography>
                <Typography mr={1} title={item?.reviewPoint} >
                    <ProductRating rating={item?.reviewPoint} />
                </Typography>
                <Typography sx={{ borderLeft: "1px solid #9ba3cc", paddingLeft: '0.5rem', fontSize: '.8rem', }}>
                    Code: {item?.productCode}
                </Typography>
            </Box>
            <Box my={2}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <img src={item.productPicture && item.productPicture[0] ? item.productPicture[0] : ""} width="100%" alt="" />
                    </Grid>
                    <Grid item md={4}>
                        <Typography sx={{
                            fontSize: "1.625rem",
                            color: "#d51243",
                            mb: 1.5
                        }}>
                            <span style={{
                                color: "#9ba3cc",
                                fontSize: "1.5rem",
                                textDecoration: "line-through"
                            }}>$12</span> ${item?.price}
                        </Typography>
                        <Typography sx={{
                            backgroundColor: "#e5f8ed",
                            display: "inline",
                            fontSize: "0.7rem",
                            color: "#4ab889",
                            fontWeight: "600",
                            padding: ".4rem .6rem",
                            borderRadius: "1rem",
                            // marginBottom: "rem"
                        }}>
                            {item?.status}
                        </Typography>
                        <Typography
                            sx={{
                                color: "#707c8f",
                                my: 2.5
                            }}
                        >
                            {
                                item?.productDescription
                            }
                        </Typography>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Box
                                sx={{
                                    backgroundColor: "#f7f8fd",
                                    fontWeight: "600",
                                    color: "black",
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.5rem',
                                }}
                            >
                                <span style={{
                                    backgroundColor: "black",
                                    width: "8px",
                                    height: "2.5px"
                                }}></span>
                            </Box>
                            <Typography>
                                1
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: "#f7f8fd",
                                    fontWeight: "600",
                                    color: "black",
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.5rem',
                                }}
                            >
                                +
                            </Box>
                            <Button
                                sx={{
                                    color: "white",
                                    backgroundColor: "#233a95",
                                    textTransform: "none",
                                    px: "2rem",
                                    borderRadius: "2rem",
                                    "&:hover": {
                                        backgroundColor: "#4f61aa",
                                    }
                                }}
                            >
                                Add to cart
                            </Button>
                        </Box>
                        <Button sx={{
                            color: "#9ba3cc",
                            backgroundColor: "white",
                            px: "2rem",
                            borderRadius: "2rem",
                            "&:hover": {
                                backgroundColor: "white",
                            },
                            border: "1px solid #9ba3cc",
                            mt: 2

                        }}>
                            <FavoriteBorderIcon sx={{ mr: 1 }} />  Add to Wishlist
                        </Button>
                    </Grid>
                    <Grid item md={4}>
                        <Typography sx={{
                            backgroundColor: "#ffeef2",
                            color: "#c02971",
                            // width: "100%",
                            textAlign: "center",
                            padding: "1rem",
                            mx: 2,
                            borderRadius: '.3rem',
                        }}>
                            Covid-19 Info: We keep delivering.
                        </Typography>
                        <Box
                            sx={{
                                borderRadius: '.3rem',
                                backgroundColor: "#f7f8fd",
                                height: '10rem',
                                p: "1rem",
                                // width: "100%",
                                mx: 2,
                                mt: 2,
                                color: "#202435",
                                fontSize: '.7rem',
                            }}
                        >
                            <Box sx={{
                                display: "flex"
                            }}>
                                <LocalShippingOutlinedIcon sx={{ mr: 1 }} />
                                <Typography> Free Shipping apply to all orders over $100</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex"
                            }}>
                                <CorporateFareOutlinedIcon sx={{ mr: 1 }} />
                                <Typography> Guranteed 100% Organic from natural farmas</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex"
                            }}>
                                <MonetizationOnOutlinedIcon sx={{ mr: 1 }} />
                                <Typography>1 Day Returns if you change your mind</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    )
}

export default ProductBody