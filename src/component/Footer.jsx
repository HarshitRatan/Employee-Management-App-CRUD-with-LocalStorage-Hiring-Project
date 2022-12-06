import React from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#666',
                color: '#ffc700',
                width: '100%',
                height: '150px'
            }}
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ height: '100%', width: '100%' }}
            >
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                    © 1997-2023 Employee Management App.
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                    Harshit Ratan Shukla © 2023
                </Typography>
            </Stack>
        </Box>
    );
};

export default Footer;
