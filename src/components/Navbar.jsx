import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import mnitlogo from '../images/MNIT logo 1.png';
import hamburger from '../images/Hamburger.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { encrypt, decrypt } from '../crypto/crypto';

import styles from "../styles/navbar.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SideDrawer = ({ isOpen, setIsOpen, handleProfileClick, handleLogout }) => {

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem key="Profile" disablePadding>
            <ListItemButton onClick={handleProfileClick}>
              <ListItemIcon>
                <AccountCircleIcon style={{fontSize: '3rem', color: 'black'}} />
              </ListItemIcon>
              <ListItemText sx={{ '.css-10hburv-MuiTypography-root': { fontSize: '2rem', fontWeight: '700' } }} primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon style={{fontSize: '3rem', color: 'black'}} />
              </ListItemIcon>
              <ListItemText sx={{ '.css-10hburv-MuiTypography-root': { fontSize: '2rem', fontWeight: '700' } }} primary="Logout" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
          <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
    </div>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitErrors, setSubmitErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [allocated, setAllocated] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(true);
  }

  useEffect(function () {
    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
    const token = localStorage.getItem(`${user}Token`);
    if(user === "student" || user === "admin"){
      if (token && token.length) {    }
      else {
        setSubmitErrors([]);
        setError("Invalid Token");
        handleClick();
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        setTimeout(() => {
          navigate(`/`);
        }, 500);
      }
    }
    else{
      setSubmitErrors([]);
      setError("Invalid User");
      handleClick();
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      setTimeout(() => {
        navigate(`/`);
      }, 500);
    }
  }, []);

  const handleProfileClick = () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
    const token = localStorage.getItem(`${user}Token`);
    if(user === "student" || user === "admin"){
      if (token && token.length) {  
        navigate(`/${user}_profile`)
      }
      else {
        setSubmitErrors([]);
        setError("Invalid Token");
        handleClick();
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        setTimeout(() => {
          navigate(`/`);
        }, 500);
      }
    }
    else{
      setSubmitErrors([]);
      setError("Invalid User");
      handleClick();
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      setTimeout(() => {
        navigate(`/`);
      }, 500);
    }
  }

  const handleLogout = () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      setTimeout(() => {
        navigate(`/`);
      }, 100);
  }

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <img src={mnitlogo} alt='mnitLogo' className={styles.logo} />
          <div className={styles.logoDiv}>
            <div className={styles.logoDivFirst}>Hostel Management System</div>
            <div className={styles.logoDivSecond}>Malaviya National Institute of Technology</div>
          </div>
        </div>
        <div className={styles.linkWrapper}>
          <div className={styles.linkDiv} onClick={handleProfileClick}>
            <AccountCircleIcon className={styles.linkIcon} />
            <div className={styles.linkText}>Profile</div>
          </div>
          <div className={styles.linkDiv} onClick={handleLogout}>
            <LogoutIcon className={styles.linkIcon} />
            <div className={styles.linkText}>Logout</div>
          </div>
          
        </div>
        <div className={styles.hamburgerWrapper} onClick={handleToggle} >
          <img src={hamburger} alt='hamburger-icon' className={styles.hamburgerIcon} />
        </div>
      </Paper>
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} handleProfileClick={handleProfileClick} handleLogout={handleLogout} />
      {open && submitErrors.length !== 0 ? (
        submitErrors.map(function (eachError) {
          //console.log(eachError);
          return (
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {eachError.msg}
              </Alert>
            </Snackbar>
          );
        })
      ) : (error !== "" ? (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        </Snackbar>
      ))}
    </div>
  )
}

export default Navbar