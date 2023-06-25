import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import mnitlogo from "../../images/MNIT logo 1.png";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { green, deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { encrypt, decrypt } from "../../crypto/crypto";
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

  const [studentData, setStudentData] = useState({});

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
    const user = decrypt(encUser ? encUser : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");
    if (user === "student") {
      if (token && token.length) {
      } else {
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
    } else {
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

  let getStudentDetails = async () => {
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    const encEmail = localStorage.getItem("email");
    const email = decrypt(encEmail ? encEmail : "");
    const encToken = localStorage.getItem(`${user}Token`);
    const token = decrypt(encToken ? encToken : "");

    if (!user || user !== "student" || !token || token.length === 0) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      localStorage.removeItem("roomId");
      navigate("/");
    }
    const response = await fetch(
      `${process.env.REACT_APP_WEBSITE_LINK}/student/getStudentDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentToken: token,
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
      
      // terepaas ek encrypted object aayega usme ye sabh hoga

      // decrypt using crypto aes using MasterKey

      resData = JSON.parse(CryptoJS.AES.decrypt(
        resData,
        process.env.REACT_APP_BACKEND_MASTER_KEY
      ).toString(CryptoJS.enc.Utf8));

      setError("");
      setSubmitErrors([]);
      setStudentData(resData);
      console.log(resData);
      setSuccess("Successfully Got Data");
    } else if (response.status === 500) {
      setError("Internal Server Error. Please Try Again later");
    }
    setTimeout(() => {
      handleClick();
    }, 100);
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  const handleChooseRoom = () => {
      const encUser = localStorage.getItem("user");
      const user = decrypt(encUser ? encUser : "");
      const encEmail = localStorage.getItem("email");
      const email = decrypt(encEmail ? encEmail : "");
      const encToken = localStorage.getItem(`${user}Token`);
      const token = decrypt(encToken ? encToken : "");

      if (!user || user !== "student" || !token || token.length === 0) {
        localStorage.removeItem("user");
        localStorage.removeItem(`${user}Token`);
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("roomId");
        navigate("/");
      }
      navigate("/choose_room");
  };

      
      // let value = {
      //   success: true,
      //   message: "OTP verified",
      //   studentToken: studentToken,
      //   name: studentData.name,
      //   email: email.toLowerCase(),
      //   phone: studentData.phoneNo,
      //   yearBatch: studentData.yearBatch,
      //   roomStatus: studentData.roomStatus,
      //   hostel: hostel ? hostel.hostelName : "",
      //   block: block ? block.block : "",
      //   floor: floor ? floor.floorNo : -1,
      //   room: room ? room.roomNo : -1,
      //   bedNo: room ? room.bedNo : -1,
      //   lock: studentData.lock,
      // };

  return (
    <div className={styles.container}>
      <Paper className={styles.wrapper}>
        <Grid container spacing={1} className={styles.gridContainer}>
          <Grid item xs={12} md={6} className={styles.firstBox}>
            <Avatar
              sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}
              alt="Student"
              src="/broken-image.jpg"
              className={styles.firstBoxImage}
            >
              {studentData ? studentData.name ? studentData.name.slice(0,1) : 'S' : 'S'}
            </Avatar>
            <div className={styles.firstBoxHeader}>{studentData ? studentData.name : ""}</div>
            <div className={styles.firstBoxSubHeader}>{studentData? studentData.email ? studentData.email.slice(0, 11) : "" : ""}</div>
            <div
              className={styles.firstBoxRoom}
              style={{ color: studentData ? studentData.permanentLocked ? "#29E918" : studentData.tempLocked ? "#29E918" : "red" : "red" }}
            >
              {studentData ? studentData.permanentLocked ? "Room Allocated" : studentData.tempLocked ? "Room Temporarily Locked" : "No Room Allocated" : ""}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={styles.secondBox}>
            <div className={styles.secondBoxContainer}>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>Hostel:</span>
                <span className={styles.secondBoxDivSecond}>
                  {studentData ? studentData.tempLocked === true ? studentData.hostel !== "" ? studentData.hostel : "No Data" : "No Data" : "No Data"}
                </span>
              </div>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>Block No:</span>
                <span className={styles.secondBoxDivSecond}>{studentData ? studentData.tempLocked === true ? studentData.block !== "" ? studentData.block : "No Data" : "No Data" : "No Data"}</span>
              </div>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>Floor No:</span>
                <span className={styles.secondBoxDivSecond}>{studentData ? studentData.tempLocked === true ? studentData.floor !== -1 ? studentData.floor : "No Data" : "No Data" : "No Data"}</span>
              </div>
              <div className={styles.secondBoxDiv}>
                <span className={styles.secondBoxDivFirst}>Room No:</span>
                <span className={styles.secondBoxDivSecond}>{ studentData ? studentData.tempLocked === true ? studentData.room !== -1 ? studentData.room : "No Data" : "No Data" : "No Data"}</span>
              </div>
              <div className={styles.secondBoxButtonWrapper}>
                <Button
                  disabled={studentData ? (studentData.isAccepting === true ? (studentData.permanentLocked === true ? true : studentData.tempLocked) : true) : true}
                  variant="contained"
                  onClick={() => handleChooseRoom()}
                  className={styles.secondBoxButton}
                >
                  Choose Room
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {open && submitErrors.length !== 0 ? (
        submitErrors.map(function (eachError) {
          //console.log(eachError);
          return (
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
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
      ) : error !== "" ? (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
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
      )}
    </div>
  );
};

export default Profile;
