import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import { encrypt, decrypt } from '../../crypto/crypto';

import styles from "../../styles/uploadTransaction.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const UploadTransaction = ({ handleGoBack }) => {
  
  const navigate = useNavigate();

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
  
  const [value, setValue] = useState("0000 0000 0000 0000");

  useEffect(function () {
    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");
    if(user === "student"){
      if (token && token.length) {     }
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

  const handleSubmit = () => {
      console.log(value);
  }
    
  return (
    <div className={styles.container}>
        <Paper className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.headerText}>
                    Upload Transaction
                </div>
            </div>
            <div className={styles.bodyWrapper}>
                <div className={styles.footer}>
                    <div className={styles.footerFirst}>Transaction ID</div>
                    <TextField id="transaction-id" className={styles.footerSecond} label="Transaction ID" value={value} onChange={(event) => { setValue(event.target.value); }} variant="outlined" />
                    {/* <input type="text" className={styles.footerSecond} value={value} onChange={handleChange} id="fname" name="fname">{value}</input> */}
                </div>
                <div className={styles.upload}>Upload File</div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button variant="contained" disabled={ value === ""} onClick={() => handleSubmit()} className={styles.submitButton}>Submit</Button>
            </div>
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

export default UploadTransaction