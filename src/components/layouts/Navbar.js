import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogOut = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Typography variant="h6" sx={{ mx: 2 }}>
        Hello, {user && user.name}!
      </Typography>
      <Button color="inherit" onClick={onLogOut} component={Link} to="/signin">
        Sign Out
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
      <Button color="inherit" component={Link} to="/signin">
        Sign In
      </Button>
    </Fragment>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Memory Game
        </Typography>
        {isAuthenticated ? authLinks : guestLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
