import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import mnitlogo from '../../images/MNIT logo 1.png'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { green, deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { encrypt, decrypt } from '../../crypto/crypto';

import styles from "../../styles/studentProfile.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
 
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

  useEffect(function () {
    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
    const token = localStorage.getItem(`${user}Token`);
    if(user === "student"){
      if (token && token.length) {    }
      else {
        setSubmitErrors([]);
        setError("Invalid Token");
        handleClick();
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
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
      setTimeout(() => {
        navigate(`/`);
      }, 500);
    }
  }, []);

  const handleChooseRoom = () => {

  }

  return (
    <div className={styles.container}>
      <Paper className={styles.wrapper}>
        <Grid container spacing={1} className={styles.gridContainer}>
          <Grid item xs={12} md={6} className={styles.firstBox}>
                    <Avatar
                        sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}
                        alt="Admin"
                        src="/broken-image.jpg"
                        className={styles.firstBoxImage}
                    >
                        B
                    </Avatar>
                <div className={styles.firstBoxHeader}>Bhuwan Joshi</div>
                <div className={styles.firstBoxSubHeader}>
                  2020UCPXXXX
                </div>
                <div className={styles.firstBoxRoom} style={{ color: allocated ? '#29E918' : 'red' }}>
                    {allocated ? 'Room Allocated' : 'No room Allocated'}
                </div>
          </Grid>
          <Grid item xs={12} md={6} className={styles.secondBox}>
            <div className={styles.secondBoxContainer}>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>
                    Hostel
                </span>
                <span className={styles.secondBoxDivSecond}>
                    Vinodini Hostel
                </span>
              </div>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>
                    Block No.
                </span>
                <span className={styles.secondBoxDivSecond}>
                    F-Block
                </span>
              </div>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>
                    Floor No.
                </span>
                <span className={styles.secondBoxDivSecond}>
                    3
                </span>
              </div>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>
                    Room No.
                </span>
                <span className={styles.secondBoxDivSecond}>
                    300
                </span>
              </div>
              <div className={styles.secondBoxButtonWrapper}>
                <Button variant="contained" onClick={() => handleChooseRoom()} className={styles.secondBoxButton}>Choose Room</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
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

export default Profile;