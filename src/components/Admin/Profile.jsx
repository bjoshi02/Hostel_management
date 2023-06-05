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

import UploadStudentList from './UploadStudentList';
import UploadRoomList from './UploadRoomList';
import CheckTransaction from './CheckTransaction';

import styles from "../../styles/adminProfile.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
 
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitErrors, setSubmitErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [checked, setChecked] = React.useState(true);
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);

  const handleOpenModal1 = () => setOpenModal1(true);
  const handleCloseModal1 = () => setOpenModal1(false);

  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
    if(user === "admin"){
      if (token && token.length) {      }
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

  const handleUploadStudent = () => {
    handleOpenModal1();
  };
  const handleUploadRoom = () => {
    handleOpenModal2();
  };
  const handleCheckRequest = () => {
    // const encryptedData = encrypt("admin");
    // localStorage.setItem("login_user", encryptedData);
    // navigate('/login_admin');
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '30px',
    boxShadow: 24,
    maxHeight: '80vh',
    overflowY: 'auto'
  };

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
                        A
                    </Avatar>
                <div className={styles.firstBoxHeader}>Admin</div>
                <div className={styles.firstBoxSubHeader}>
                  2020UCPXXXX
                </div>
                <div className={styles.firstBoxSwitch}>
                    <FormControlLabel 
                        control = 
                        {
                            <Switch 
                                checked={checked}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: green[600],
                                        '&:hover': {
                                        backgroundColor: alpha(green[600]),
                                        },
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: green[600],
                                    },
                                }}
                             />
                        } 
                        label="Accepting Responses" 
                    />
                </div>
          </Grid>
          <Grid item xs={12} md={6} className={styles.secondBox}>
            <div className={styles.secondBoxContainer}>
              {/* <div className={styles.secondBoxHeader}>Profile</div> */}
              <Button variant="contained" onClick={() => handleUploadStudent()} className={styles.secondBoxButton}>Upload Student List</Button>
              <Button variant="contained" onClick={() => handleUploadRoom()} className={styles.secondBoxButton}>Upload Room List</Button>
              <Button variant="contained" onClick={() => handleCheckRequest()} className={styles.secondBoxButton}>Check Room Request</Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={openModal1}
        onClose={handleCloseModal1}
      >
        <Box sx={modalStyle} className={styles.modalBox}>
          <UploadStudentList handleGoBack={handleCloseModal1} />
        </Box>
      </Modal>
      <Modal
        open={openModal2}
        onClose={handleCloseModal2}
      >
        <Box sx={modalStyle} className={styles.modalBox}>
          {/* <UploadRoomList handleGoBack={handleCloseModal2} /> */}
          {/* <CheckTransaction handleGoBack={handleCloseModal2} /> */}
        </Box>
      </Modal>
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