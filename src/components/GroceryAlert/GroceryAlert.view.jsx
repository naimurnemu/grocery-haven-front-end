import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function GroceryAlert({ enable, msg, severity }) {
    const [open, setOpen] = useState(enable);
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => setOpen(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionProps={{ direction: 'left' }}
        >
            <Alert severity={severity} onClose={handleClose}>
                {msg}
            </Alert>
        </Snackbar>
    );
}

export default GroceryAlert;
