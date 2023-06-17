import React, { useState, useEffect } from 'react';
import Table from '../Table/RowSelection';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadCheckList from './UploadCheckList.jsx';
import { useNavigate } from 'react-router-dom';
import { encrypt, decrypt } from '../../crypto/crypto';
import CryptoJS from "crypto-js";
import styles from '../../styles/roomRequest.module.css';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RoomRequest = () => {

  const navigate = useNavigate();

  const [files, setFiles] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = ()=> setOpenModal(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitErrors, setSubmitErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [sent, setSent] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleUploadCheckList = () => {
    handleOpenModal();
  };

  const handleListLock =  async () => {
    // console.log(files);

    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
    const encToken = localStorage.getItem(`${user}Token`);
    const token  = decrypt((encToken ? encToken : ""));

    let formData=new FormData();

    for(let i=0;i<files.length;i++){
        formData.append("attachments",files[i].file);
    }
    
    if(user ===  "admin"){
      formData.append(`adminToken`, token);
    }
    else{
      setError("Invalid Token Please Login Again"); 
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("login_user");
      localStorage.removeItem("facultyToken");      
      localStorage.removeItem("studentToken");  
      localStorage.removeItem("roomId");    
       setTimeout(() => {
         navigate("/admin_login");
       }, 2000);
    }


    try{
      await axios.post(`${process.env.REACT_APP_WEBSITE_LINK}/admin/uploadchecklist`,formData,{ headers: {
        'content-type': 'multipart/form-data'
      }})

      // console.log("Hello Found")
        setSubmitErrors([]);
        setError("");
        setSuccess("Successfully Uploaded!");
        setFiles([]);
        // setOpenModal(false);
        navigate(0);
        handleClick();
    }
    catch(error){
      const response = error.response;       
      
      if(response.status === 400){
        if(response.data.error === "Access denied"){
          setSubmitErrors([]);
          setError("Access Denied Please Login Again");
          handleClick(); 
          localStorage.removeItem(`${user}Token`);
          localStorage.removeItem("email");
          localStorage.removeItem("login_user");
          localStorage.removeItem("roomId");
          setTimeout(() => {
              navigate("/admin_login");
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
          setError("Cannot Upload, Try Again!");
      }
    }

  }

  const handleUnlockClick = async () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");

    if (!user || user !== "admin" || !token || token.length === 0) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      navigate("/");
    }
    // adminToken, studentArray
    // student ID -> _id address hoga isme
    // const studentArray = JSON.parse(selectedRows);
    console.log("selected Rows : ", selectedRows);

    const response = await fetch(
      `${process.env.REACT_APP_WEBSITE_LINK}/admin/unlockroom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          adminToken: token,
          studentArray: selectedRows.map((row) => {
            return row.original._id;
          })
        })
      }
    );
    let resData = await response.json();
    if (response.status === 400) {
      // //console.log(resData.error);
      setSubmitErrors([]);
      setSuccess("");
      setError(resData.error);
      if(resData.error === "Access denied"){
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      }
      // //console.log(error)
    } else if (response.status === 200) {
      setError("");
      setSubmitErrors([]);
      setSuccess("Successfully Unlocked Rooms of Selected Students");
      navigate(0);
    } else if (response.status === 500) {
      setError("Internal Server Error. Please Try Again later");
    }
    setTimeout(() => {
      handleClick();
    }, 100);
  }

  const handleLockClick = async () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");

    if (!user || user !== "admin" || !token || token.length === 0) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      navigate("/");
    }
    const response = await fetch(
      `${process.env.REACT_APP_WEBSITE_LINK}/admin/lockroom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminToken: token,
          studentArray: selectedRows.map((row) => {
            return row.original._id;
          })
        })
      }
    );
    let resData = await response.json();
    if (response.status === 400) {
      // //console.log(resData.error);
      setSubmitErrors([]);
      setSuccess("");
      setError(resData.error);
      if(resData.error === "Access denied"){
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      }
      // //console.log(error)
    } else if (response.status === 200) {
      setError("");
      setSubmitErrors([]);
      setSuccess("Successfully Locked Rooms of Selected Students");
      navigate(0);
    } else if (response.status === 500) {
      setError("Internal Server Error. Please Try Again later");
    }
    setTimeout(() => {
      handleClick();
    }, 100);
  }

  const handleDownloadList = async () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");

    if (!user || user !== "admin" || !token || token.length === 0) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      navigate("/");
    }
    const response = await fetch(
      `${process.env.REACT_APP_WEBSITE_LINK}/admin/downloadList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminToken: token,
        })
      }
    );
    if (response.status === 400) {
      let resData = await response.json();
      // //console.log(resData.error);
      setSubmitErrors([]);
      setSuccess("");
      setError(resData.error);
      if(resData.error === "Access denied"){
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      }
      // //console.log(error)
    } else if (response.status === 200) {
      setError("");
      setSubmitErrors([]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      // console.log("Url", url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        'studentData.xlsx',
      );
  
        // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);

      setSuccess("Successfully Downloaded Student List");
      navigate(0);
    } else if (response.status === 500) {
      setError("Internal Server Error. Please Try Again later");
    }
    setTimeout(() => {
      handleClick();
    }, 100);
  }

  
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
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");

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

  let getRequestsData = async () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");

    if (!user || user !== "admin" || !token || token.length === 0) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      navigate("/");
    }
    const response = await fetch(
      `${process.env.REACT_APP_WEBSITE_LINK}/admin/showRequests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminToken: token,
        }),
      }
    );
    let resData = await response.json();
    if (response.status === 400) {
      // //console.log(resData.error);
      setSubmitErrors([]);
      setSuccess("");
      setError(resData.error);
      if(resData.error === "Access denied"){
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      }
      // //console.log(error)
    } else if (response.status === 200) {
      resData = JSON.parse(
        CryptoJS.AES.decrypt(
          resData,
          process.env.REACT_APP_BACKEND_MASTER_KEY
        ).toString(CryptoJS.enc.Utf8)
      );

      setError("");
      setSubmitErrors([]);
      setSuccess("Successfully Got Request Data");
      setRequests(resData);
      setSent(true);
    } else if (response.status === 500) {
      setError("Internal Server Error. Please Try Again later");
    }
    setTimeout(() => {
      handleClick();
    }, 100);
  };


  useEffect(() => {
    if(sent === false){
        getRequestsData();
    }
  },[sent]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '30px',
    boxShadow: 24,
    maxHeight: '80vh',
    width: '60%',
    overflowY: 'auto'
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.paperStyle}>
        <div className={styles.heading}>Room Requests</div>
        <div className={styles.tableContainer}>
          <Table requests={requests} setSelectedRows={setSelectedRows} />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonSubContainer1}>
            <Button onClick={handleUploadCheckList} variant="contained" className={styles.buttonRoom}>
              Upload List
            </Button>
            <Button variant="contained" onClick={handleDownloadList} className={styles.buttonRoom}>
              Download List
            </Button>
          </div>
          <div className={styles.buttonSubContainer2}>
            <Button variant="contained" onClick={handleUnlockClick} className={styles.buttonRoom}>
              Unlock
            </Button>
            <Button variant="contained" onClick={handleLockClick} className={styles.buttonRoom}>
              Lock
            </Button>
          </div>
        </div>
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={modalStyle} className={styles.modalBox}>
          <UploadCheckList files={files} setFiles={setFiles} handleListLock = {handleListLock} handleGoBack={handleCloseModal} />
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



        {/* <pre>
        <code>
        {JSON.stringify(
          {
            selectedRows: selectedRows.map(row => row.original)
          },
          null,
          2
          )}
        </code>
      </pre> */}
    </div>
  );
}

export default RoomRequest