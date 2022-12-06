import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar sx={{ backgroundColor: '#282828', color: '#ffc700' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ fontWeight: '800' }}>
          Employee Management App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;