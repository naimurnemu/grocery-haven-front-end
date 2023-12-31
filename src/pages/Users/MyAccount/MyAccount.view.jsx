import { Button, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import GroceryAlert from '../../../components/GroceryAlert';
import { selectUser } from '../../../reduxMine/features/authApi';
import { OrderList } from './OrderList';

const access_token = localStorage.getItem("accessToken");

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AdditionalDetailsTab() {
    const [value, setValue] = React.useState(0);
    const user = useSelector(selectUser);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', border: "1px solid lightgrey", borderRadius: ".5rem" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#2bbef9"
                        }
                    }}
                    aria-label="basic tabs example">
                    <Tab label="ORDERS" {...a11yProps(1)} sx={{
                        fontWeight: "600",
                        color: "lightgrey",
                        '&.Mui-selected': {
                            color: "black",
                            // border: "none"
                        }
                    }} />
                    <Tab label="ACCOUNT DETAILS" {...a11yProps(0)} disableFocusRipple={true} sx={{
                        fontWeight: "600",
                        color: "lightgrey",
                        '&.Mui-selected': {
                            color: "black",
                        }
                    }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <OrderList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <AccountDetailsForm />
            </CustomTabPanel>
        </Box>
    );
}

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Required'),
    // currentPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    // newPassword: yup.string().min(8, 'Password must be at least 8 characters')
    //     .notOneOf([yup.ref('currentPassword')], 'New password cannot be the same as the current password')
    //     .required('Required'),
    phoneNumber: yup.string().required('Required'),
    name: yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
    }),
    address: yup.string().required('Required'),
    gender: yup.string().required('Required'),
    age: yup.number().min(18, 'Must be at least 18').required('Required'),
});

const accountDetails = {
    email: '',
    // newPassword: '',
    // currentPassword: '',
    phoneNumber: '',
    name: {
        firstName: '',
        lastName: '',
    },
    address: '',
    gender: '',
    age: '',
};


const AccountDetailsForm = () => {
    const dataFetchedRef = useRef(false);
    const [initialValues, setinInitialValues] = useState(accountDetails);
    const [successAlert, setSuccessAlert] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            axios.patch(`${process.env.REACT_APP_API_URI}users/`,
                values,
                {
                    headers: {
                        authorization: `${access_token}`,
                    },
                }
            )
                .then((res) => {
                    if (res.data.success) {
                        setSuccessAlert(true)
                    }
                })
        },
    });

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        axios.get(`${process.env.REACT_APP_API_URI}users/single-user`,
            {
                headers: {
                    authorization: `${access_token}`,
                },
            }
        ).then(res => {
            const { email, phoneNumber, name, address, gender, age } = res?.data?.data;
            setinInitialValues({
                email: email,
                // newPassword: '',
                // currentPassword: '',
                phoneNumber: phoneNumber,
                name: {
                    firstName: name?.firstName,
                    lastName: name?.lastName,
                },
                address: address,
                gender: gender,
                age: age,
            })
        })
    }, [])

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="First Name"
                            name="name.firstName"
                            value={formik.values?.name?.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name?.firstName && Boolean(formik.errors.name?.firstName)}
                            helperText={formik.touched.name?.firstName && formik.errors.name?.firstName}
                            fullWidth
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Last Name"
                            name="name.lastName"
                            value={formik.values?.name?.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name?.lastName && Boolean(formik.errors.name?.lastName)}
                            helperText={formik.touched.name?.lastName && formik.errors.name?.lastName}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            name="address"
                            value={formik.values?.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <RadioGroup
                            aria-label="gender"
                            name="gender"
                            value={formik.values?.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography mr={1} fontWeight={600} fontSize=".9rem">
                                    Gender
                                </Typography>

                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </Box>
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="age"
                            name="age"
                            label="Age"
                            type="number"
                            value={formik.values?.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                            inputProps={{
                                min: 18,
                                max: 99,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            name="email"
                            disabled
                            value={formik.values.email}
                            // value={initialValues?.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formik.values?.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            fullWidth
                        />
                    </Grid>

                    {/* <Grid item xs={6}>
                        <TextField
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                            fullWidth
                        />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                // onClick={()}
                >Save Changes</Button>
            </form>
            {
                successAlert &&
                // <Alert severity="success">Your account details updated successfully </Alert>
                <GroceryAlert enable={successAlert} msg="Your account details updated successfully" severity="success"
                />
            }
        </div>
    );
};

export default function MyAccount() {
    document.title = "My Account | Grocery Heaven"
    return (
        <Box sx={{ m: 4 }}>
            <AdditionalDetailsTab />
        </Box>
    )
}