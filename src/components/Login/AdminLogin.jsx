import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import mnitlogo from '../../images/MNIT logo 1.png'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { encrypt, decrypt } from '../../crypto/crypto';

import styles from "../../styles/adminLogin.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminLogIn = () => {
 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (event) => {
    //console.log(event);
    event.preventDefault();
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = (event) => {
    //console.log(event);
    event.preventDefault();
  };

  useEffect(function () {
    const encUser = localStorage.getItem("user");
    const user = decrypt((encUser ? encUser : ""));
    const token = localStorage.getItem(`${user}Token`);
    if (token && token.length) {
      handleClick();
      setError("Already Logged In. Please Logout First!!");
      setTimeout(() => {
        navigate(`/${user}_profile`);
      }, 500);
    }
    else {
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");    
    }
  }, []);
  
  const onSubmit = async (data) => {    
    const encUser = localStorage.getItem("user");
    const user = decrypt(encUser ? encUser : "");
    if ((!user) || (user !== "admin")) {
      localStorage.removeItem("user");
      localStorage.removeItem(`${user}Token`);
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
      navigate('/');
    }
    // //console.log(`${process.env.REACT_APP_website_link}/${user}/sendEmail`);        
    const response = await fetch(
      `${process.env.REACT_APP_WEBSITE_LINK}/admin/adminlogin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      }
    );
    let resData = await response.json();
    if (response.status === 400) {
      // //console.log(resData.error);
      setSubmitErrors([]);
      setSuccess("");
      setError(resData.error);
      // //console.log(error)
    }
//  ADMIN_EMAIL = adminhostel@mnit.ac.in
//  ADMIN_PASSWORD = adxtesasfqrt
    else if (response.status === 200) {
      setError("");
      setSubmitErrors([]);
      setSuccess("Successfully logged in");
      localStorage.setItem(`adminToken`, resData[`adminToken`]);
      localStorage.setItem("email", encrypt(data.email));
      setTimeout(() => {
        navigate("/admin_profile");
      }, 500);
    } 
    else if (response.status === 500) {
      setError("Internal Server Error. Please Try Again later");
    }
    setTimeout(() => {
      handleClick();
    }, 100);

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
              <div className={styles.secondBoxHeader}>Admin Login</div>
              <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.secondBoxForm}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  sx={{
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                        borderWidth: '0px',
                    },
                    ".css-md26zr-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: '0px',
                    },
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Required field",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })
                  }
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                //   InputProps={{
                //     startAdornment: (
                //       <InputAdornment position="start">
                //         <AlternateEmailIcon style={{ color: '#1C4EFE' }} />
                //       </InputAdornment>
                //     ),
                //   }}
                  className={styles.secondBoxTextField}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  {...register("password", {
                    required: "Required field",
                  })
                  }
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  sx={{
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                        borderWidth: '0px',
                    },
                    ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: '0px',
                    },
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  InputProps={{ // <-- This is where the toggle button is added.
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <PasswordIcon style={{ color: '#FEB60A' }} />
                    //   </InputAdornment>
                    // ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{ color: '#FEB60A' }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={styles.secondBoxTextField}
                />
                <Button variant="contained" type="submit" className={styles.secondBoxButton}>Proceed</Button>
              </form>
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

export default AdminLogIn;