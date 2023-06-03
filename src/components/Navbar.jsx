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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import styles from "../styles/navbar.module.css";

const SideDrawer = ({ isOpen, setIsOpen }) => {

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
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon style={{fontSize: '3rem', color: 'black'}} />
              </ListItemIcon>
              <ListItemText sx={{ '.css-10hburv-MuiTypography-root': { fontSize: '2rem', fontWeight: '700' } }} primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Logout" disablePadding>
            <ListItemButton>
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
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(true);
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
          <div className={styles.linkDiv}>
            <AccountCircleIcon className={styles.linkIcon} />
            <div className={styles.linkText}>Profile</div>
          </div>
          <div className={styles.linkDiv}>
            <LogoutIcon className={styles.linkIcon} />
            <div className={styles.linkText}>Logout</div>
          </div>
          
        </div>
        <div className={styles.hamburgerWrapper} onClick={handleToggle} >
          <img src={hamburger} alt='hamburger-icon' className={styles.hamburgerIcon} />
        </div>
      </Paper>
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Navbar