import { Box, Checkbox, Container, Divider, FormControlLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useGetCartListQuery } from '../../reduxMine/features/cart/cartAPIs';
import { BillingAdress } from './component/BillingAdress';
const SubmitButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#ed174a',
    '&:hover': {
        backgroundColor: '#ed174a',
    },
    padding: '13px 8px'
}));

const billingDetails = {
    email: "",
    name: {
        firstName: '',
        lastName: '',
    },
    companyName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    phone: "",
    orderNotes: "",
    paymentMethod: 'COD',
    country: '',
    state: ''
}

const validationSchema = yup.object({
    name: yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
    }),
    email: yup.string().email('Invalid email').required('Required'),
    streetAddress: yup.string().required('Required'),
    city: yup.string().required('Required'),
    zipCode: yup.string().required('Required'),
    phone: yup.string().matches(/^[0-9+\-]+$/, 'phone number is not valid').required('Required'),
    companyName: yup.string(),
    orderNotes: yup.string(),
    paymentMethod: yup.string(),
    country: yup.string().required('Required'),
    state: yup.string().required('Required')

});
export const CheckoutView = () => {
    document.title = "Checkout | Grocery Heaven"
    // console.log(useLocation())
    const dataFetchedRef = useRef(false);
    const { data } = useGetCartListQuery(undefined);
    const locationsData = useLocation();
    const navigate = useNavigate();
    // console.log(locationsData.state)
    const [stateValue, setStateValue] = useState({})
    const [productData, setProductData] = useState([])
    // console.log(data.data)
    const [value, setValue] = useState('flatRate');
    const [deliveryStatus, setDeliveryStatus] = useState('cashOnDelivery');
    const [termsCondition, settermsCondition] = React.useState(false);
    const [initialValues, setinInitialValues] = useState(billingDetails);
    const [successAlert, setSuccessAlert] = useState(false);
    const access_token = localStorage.getItem("accessToken");
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            axios.post(`${process.env.REACT_APP_API_URI}order/`,
                values,
                {
                    headers: {
                        authorization: `${access_token}`,
                    },
                }
            )
                .then((res) => {
                    if (res.data.success) {
                        // console.log(values)
                        // console.log(res.data)
                        navigate('/checkout/order-recieved',{state:{shippingValue:value,product: data.data,  total: stateValue?.state?.total, orderStatus: true, billingInfo: values}})
                        setSuccessAlert(true)
                    }
                }).catch((error) => {
                    console.log(error)
                })

        },

    });

    useEffect(() => {
        // const locaitons = useLocation()
        setValue(locationsData?.state?.shippingValue)
        setStateValue(locationsData)
        setProductData(data.data)
    }, [])
    // useEffect(() => {
    //     if (dataFetchedRef.current) return;
    //     dataFetchedRef.current = true;
    //     axios.get(`${process.env.REACT_APP_API_URI}cart`,
    //         {
    //             headers: {
    //                 authorization: `${access_token}`,
    //             },
    //         }
    //     ).then(res => {
    //         // const { email, phoneNumber, name, address, gender, age } = res?.data?.data;
    //         console.log(res.data)
    //         // setinInitialValues({
    //         //     email: email,
    //         //     // newPassword: '',
    //         //     // currentPassword: '',
    //         //     phoneNumber: phoneNumber,
    //         //     name: {
    //         //         firstName: name?.firstName,
    //         //         lastName: name?.lastName,
    //         //     },
    //         //     address: address,
    //         //     gender: gender,
    //         //     age: age,
    //         // })
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])
    return (
        <Container sx={{ padding: '40px 0' }}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ padding: '6px 2px', margin: "8px 0", borderBottom: '1px dashed #2ec766' }}>
                    <Typography sx={{ fontWeight: '500', fontSize: '14px', color: '#8a8686' }}>Add your shipping details and procced your order.</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} >
                        <BillingAdress formik={formik} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl sx={{ border: "2px solid #233a95", borderRadius: '7px', padding: "10px 8px" }}>
                            <Typography variant='subtitle1' textAlign={'center'}>YOUR ORDER</Typography>
                            <Divider />
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: 14, fontWeight: '600', color: '#71778e' }}>Product</TableCell>
                                            <TableCell align="right" sx={{ fontSize: 14, fontWeight: '600', color: '#71778e' }}>Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.data.map((item,) => (
                                                <TableRow
                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    sx={{borderBottom: 'none'}}
                                                    key={item?._id}
                                                >

                                                    <TableCell component="th" scope="row"   sx={{borderBottom: 'none'}}>
                                                        {`${item?.productId?.productName} x ${item?.quantity}`}
                                                    </TableCell>
                                                    <TableCell align="right"  sx={{borderBottom: 'none'}} >{item?.productId?.price * item?.quantity}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                        <TableRow
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{borderTop: "1px solid rgb(224 219 224)"}}>
                                                {"SubTotal"}
                                            </TableCell>
                                            <TableCell align="right" sx={{borderTop: "1px solid rgb(224 219 224)"}} >{stateValue?.state?.total}</TableCell>
                                        </TableRow>
                                        <TableRow
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{}}>
                                                Shipping
                                            </TableCell>
                                            <TableCell align="left" >
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender"
                                                    value={value}
                                                    onChange={(val) => setValue(val.target.value)}
                                                >
                                                    <FormControlLabel labelPlacement="start" value="flatRate" control={<Radio />} label={<Typography noWrap sx={{ display: 'inline-flex', fontSize: ".875rem", }}>Flat Rate <Typography style={{ color: '#d51243', fontSize: ".8125rem", marginLeft: '5px' }}> $5.00</Typography> </Typography>} />

                                                    <FormControlLabel labelPlacement="start" value="localPickup" noWrap control={<Radio />}
                                                        label={<Typography noWrap sx={{ fontSize: ".8125rem" }} >Local picup</Typography>}
                                                    />
                                                </RadioGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{}}>
                                                {"Total"}
                                            </TableCell>
                                            <TableCell align="right" >{stateValue?.state?.total + (stateValue?.state?.shippingValue === 'flatRate' ? 5.00 : 0)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box>
                                <Box sx={{ padding: '6px 12px' }}>
                                    <RadioGroup
                                        aria-label="delivary status"
                                        name="delivery"
                                        value={deliveryStatus}
                                        onChange={(val) => setDeliveryStatus(val.target.value)}
                                    >
                                        <FormControlLabel labelPlacement="end" value="cashOnDelivery" control={<Radio />} label={<Typography noWrap sx={{ color: '#233a95', fontSize: ".875rem", fontWeight: '600' }}>Cash on delivery</Typography>} />
                                    </RadioGroup>
                                </Box>

                                <Divider />
                                <Box sx={{ padding: '6px 12px', fontSize: '12px' }}>
                                    <Typography sx={{ fontSize: '.8125rem', lineHeight: '1.6' }}>
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                                    </Typography>
                                    <FormControlLabel control={<Checkbox checked={termsCondition}
                                        onChange={(val) => settermsCondition(!termsCondition)} />} label={<Typography noWrap sx={{ display: 'inline-flex', fontSize: '.8125rem', }}>I have read and agree to the website  <Typography style={{ color: '#d51243', fontSize: '.8125rem', marginLeft: '5px' }}> terms and conditions </Typography> </Typography>} />
                                </Box>
                            </Box>
                            <SubmitButton type="submit" disabled={!termsCondition} variant="contained">Place Order</SubmitButton>
                        </FormControl>
                    </Grid>

                </Grid>
            </form>
        </Container>
    )
}
