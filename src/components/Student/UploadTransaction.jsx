import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import { encrypt, decrypt } from '../../crypto/crypto';
import CryptoJS from "crypto-js";
import UploadFile from './UploadFile';
import axios from 'axios';
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
  const [files, setFiles] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const [value, setValue] = useState("0000000000000000");

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

  const handleSubmit = async () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");
    const encRoomId = localStorage.getItem("roomId");
    const room = decrypt(encRoomId ? encRoomId : "");
    console.log(room);
    if (!user || user !== "student" || !token || token.length === 0 || !room || room.length === 0) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      navigate("/");
    }
    if(value.length > 0){
      let formData=new FormData();

    for(let i=0;i<files.length;i++){
        formData.append("attachments",files[i].file);
    }
    
    formData.append('studentToken', token);
    formData.append('roomId', room);
    formData.append('transactionId', value);

    try{
      await axios.post(`${process.env.REACT_APP_WEBSITE_LINK}/student/transactionSubmit`,formData,{ headers: {
        'content-type': 'multipart/form-data'
      }});

      // console.log("Hello Found")
        setSubmitErrors([]);
        setError("");
        setSuccess("Room Temporarily Locked!");
        setFiles([]);
        handleClick();
        setTimeout(() => {
          navigate(`/student_profile`);
        }, 500);
    }
    catch(error){
      const response = error.response;       
      if(response.status === 400){
        if(response.data.error === "Access denied"){
          setSubmitErrors([]);
          setError("Access Denied Please Login Again");
          handleClick(); 
          localStorage.removeItem("user");
          localStorage.removeItem(`${user}Token`);
          localStorage.removeItem("email");
          localStorage.removeItem("otp");
          localStorage.removeItem("roomId");
          setTimeout(() => {
              navigate("/");
          }, 1200)
        }
        else{
          setSubmitErrors([]);
          setError(response.data.error);
        }
      }
      else if(response.status === 403){
          console.log("error 403");
          setSubmitErrors(response.data.errors);
      }
      else{
        setSubmitErrors([]);
        setError("Cannot Upload, Try Again!");
      }
    }      
    }
    else{
      setSubmitErrors([]);
      setError("Transaction Id cannot be Empty");
      handleClick();
    }
    setTimeout(() => {
      handleClick();
    }, 100);
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
                <div className={styles.upload}>
                  <UploadFile files = {files}  setFiles = {setFiles}/>
                  {/* <input type="file"  onChange ={setFiles} /> */}
                </div>
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