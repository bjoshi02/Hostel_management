import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import mnitlogo from '../../images/MNIT logo 1.png'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';

import styles from "../../styles/login.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LogIn = () => {
 
//   const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitErrors, setSubmitErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

//   useEffect(function () {
//     const encUser = localStorage.getItem("login_user");
//     const user = decrypt((encUser ? encUser : ""));
//     const token = localStorage.getItem(`${user}Token`);
//     if (token && token.length) {
//       handleClick();
//       setError("Already Logged In. Please Logout First!!");
//       setTimeout(() => {
//         navigate("/");
//       }, 500);
//     }
//     else {
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("login_user");
//       localStorage.removeItem("email");
//     }
//   }, []);

  const handleClickStudent = () => {
    // const encryptedData = encrypt("student");
    // //console.log(encryptedData);
    // const decryptedData = decrypt(encryptedData);
    // //console.log(decryptedData);
    // localStorage.setItem("login_user", encryptedData);
    // navigate('/login_student');
  };
  const handleClickAdmin = () => {
    // const encryptedData = encrypt("admin");
    // localStorage.setItem("login_user", encryptedData);
    // navigate('/login_admin');
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.wrapper}>
        <Grid container spacing={1} className={styles.gridContainer}>
          <Grid item xs={12} md={6} className={styles.firstBox}>
            <Paper className={styles.firstBoxPaper}>
                <img src={mnitlogo} alt='mnitLogo' className={styles.firstBoxImage}/>
                <div className={styles.firstBoxHeader}>Hostel Management System</div>
                <div className={styles.firstBoxSubHeader}>
                  Malaviya National Institute of Technology Jaipur
                </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={styles.secondBox}>
            <div className={styles.secondBoxContainer}>
              <div className={styles.secondBoxHeader}>Login</div>
              <Button variant="contained" onClick={() => handleClickAdmin()} className={styles.secondBoxButton}>Admin</Button>
              <Button variant="contained" onClick={() => handleClickStudent()} className={styles.secondBoxButton}>Student</Button>
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

export default LogIn;