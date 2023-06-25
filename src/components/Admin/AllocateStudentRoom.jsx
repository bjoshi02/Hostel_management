import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { encrypt, decrypt } from "../../crypto/crypto";
import CryptoJS from "crypto-js";

import styles from "../../styles/chooseRoom.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChooseRoom = () => {
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

  const [hostels, setHostels] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [hostel, setHostel] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");

//   useEffect(function () {
//     const encUser = localStorage.getItem("user");
//     const user = decrypt(encUser ? encUser : "");
//     const encToken = localStorage.getItem(`${user}Token`);
//     const token = decrypt(encToken ? encToken : "");
//     if (user === "student") {
//       if (token && token.length) {
//       } else {
//         setSubmitErrors([]);
//         setError("Invalid Token");
//         handleClick();
//         localStorage.removeItem("user");
//         localStorage.removeItem(`${user}Token`);
//         localStorage.removeItem("email");
//         localStorage.removeItem("otp");
//         localStorage.removeItem("roomId");
//         setTimeout(() => {
//           navigate(`/`);
//         }, 500);
//       }
//     } else {
//       setSubmitErrors([]);
//       setError("Invalid User");
//       handleClick();
//       localStorage.removeItem("user");
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("email");
//       localStorage.removeItem("otp");
//       localStorage.removeItem("roomId");
//       setTimeout(() => {
//         navigate(`/`);
//       }, 500);
//     }
//   }, []);

//   let getHostelDetails = async () => {
//     const encUser = localStorage.getItem("user");
//     const user = decrypt(encUser ? encUser : "");
//     const encToken = localStorage.getItem(`${user}Token`);
//     const token = decrypt(encToken ? encToken : "");

//     if (!user || user !== "student" || !token || token.length === 0) {
//       localStorage.removeItem("user");
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("email");
//       localStorage.removeItem("otp");
//       localStorage.removeItem("roomId");
//       navigate("/");
//     }
//     const response = await fetch(
//       `${process.env.REACT_APP_WEBSITE_LINK}/student/chooseRoomHostel`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           studentToken: token,
//         }),
//       }
//     );
//     let resData = await response.json();
//     if (response.status === 400) {
//       // //console.log(resData.error);
//       setSubmitErrors([]);
//       setSuccess("");
//       setError(resData.error);
//       if (resData.error === "Access denied") {
//         localStorage.removeItem("user");
//         localStorage.removeItem(`${user}Token`);
//         localStorage.removeItem("email");
//         localStorage.removeItem("otp");
//         localStorage.removeItem("roomId");
//         setTimeout(() => {
//           navigate(`/`);
//         }, 1000);
//       }
//       // //console.log(error)
//     } else if (response.status === 200) {
//       resData = JSON.parse(
//         CryptoJS.AES.decrypt(
//           resData,
//           process.env.REACT_APP_BACKEND_MASTER_KEY
//         ).toString(CryptoJS.enc.Utf8)
//       );
//       setError("");
//       setSubmitErrors([]);
//       setHostels(resData);
//       setSuccess("Successfully Got Hostel Data");
//     } else if (response.status === 500) {
//       setError("Internal Server Error. Please Try Again later");
//     }
//     setTimeout(() => {
//       handleClick();
//     }, 100);
//   };

//   useEffect(() => {
//     getHostelDetails();
//   }, []);

//   let getBlockDetails = async () => {
//     const encUser = localStorage.getItem("user");
//     const user = decrypt(encUser ? encUser : "");
//     const encToken = localStorage.getItem(`${user}Token`);
//     const token = decrypt(encToken ? encToken : "");

//     if (!user || user !== "student" || !token || token.length === 0) {
//       localStorage.removeItem("user");
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("email");
//       localStorage.removeItem("otp");
//       localStorage.removeItem("roomId");
//       navigate("/");
//     }
//     const response = await fetch(
//       `${process.env.REACT_APP_WEBSITE_LINK}/student/chooseRoomBlock`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           studentToken: token,
//           hostelId: hostel,
//         }),
//       }
//     );
//     let resData = await response.json();
//     if (response.status === 400) {
//       // //console.log(resData.error);
//       setSubmitErrors([]);
//       setSuccess("");
//       setError(resData.error);
//       if (resData.error === "Access denied") {
//         localStorage.removeItem("user");
//         localStorage.removeItem(`${user}Token`);
//         localStorage.removeItem("email");
//         localStorage.removeItem("otp");
//         localStorage.removeItem("roomId");
//         setTimeout(() => {
//           navigate(`/`);
//         }, 1000);
//       }
//       // //console.log(error)
//     } else if (response.status === 200) {
//       resData = JSON.parse(
//         CryptoJS.AES.decrypt(
//           resData,
//           process.env.REACT_APP_BACKEND_MASTER_KEY
//         ).toString(CryptoJS.enc.Utf8)
//       );

//       setError("");
//       setSubmitErrors([]);
//       setBlocks(resData);
//       setSuccess("Successfully Got Block Data");
//     } else if (response.status === 500) {
//       setError("Internal Server Error. Please Try Again later");
//     }
//     setTimeout(() => {
//       handleClick();
//     }, 100);
//   };

//   // /chooseRoomHostel
//   // -> student token bhejna hai aur hit kdardena

//   useEffect(() => {
//     if (hostel.length !== 0) {
//       getBlockDetails();
//     }
//   }, [hostel]);

//   // /chooseRoomBlock
//   // send the studentToken and hostelId to backend
//   let getFloorDetails = async () => {
//     const encUser = localStorage.getItem("user");
//     const user = decrypt(encUser ? encUser : "");
//     const encToken = localStorage.getItem(`${user}Token`);
//     const token = decrypt(encToken ? encToken : "");

//     if (!user || user !== "student" || !token || token.length === 0) {
//       localStorage.removeItem("user");
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("email");
//       localStorage.removeItem("otp");
//       localStorage.removeItem("roomId");
//       navigate("/");
//     }
//     const response = await fetch(
//       `${process.env.REACT_APP_WEBSITE_LINK}/student/chooseRoomFloor`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           studentToken: token,
//           blockId: block,
//         }),
//       }
//     );
//     let resData = await response.json();
//     if (response.status === 400) {
//       // //console.log(resData.error);
//       setSubmitErrors([]);
//       setSuccess("");
//       setError(resData.error);
//       if (resData.error === "Access denied") {
//         localStorage.removeItem("user");
//         localStorage.removeItem(`${user}Token`);
//         localStorage.removeItem("email");
//         localStorage.removeItem("otp");
//         localStorage.removeItem("roomId");
//         setTimeout(() => {
//           navigate(`/`);
//         }, 1000);
//       }
//       // //console.log(error)
//     } else if (response.status === 200) {
//       resData = JSON.parse(
//         CryptoJS.AES.decrypt(
//           resData,
//           process.env.REACT_APP_BACKEND_MASTER_KEY
//         ).toString(CryptoJS.enc.Utf8)
//       );

//       setError("");
//       setSubmitErrors([]);
//       setFloors(resData);
//       setSuccess("Successfully Got Floors Data");
//     } else if (response.status === 500) {
//       setError("Internal Server Error. Please Try Again later");
//     }
//     setTimeout(() => {
//       handleClick();
//     }, 100);
//   };
//   // /chooseRoomFloor
//   // send the studentToken and blockId
//   useEffect(() => {
//     if (block.length !== 0) {
//       getFloorDetails();
//     }
//   }, [block]);
//   // /chooseRoom
//   // send the studentToken and floorid
//   let getRoomDetails = async () => {
//     const encUser = localStorage.getItem("user");
//     const user = decrypt(encUser ? encUser : "");
//     const encToken = localStorage.getItem(`${user}Token`);
//     const token = decrypt(encToken ? encToken : "");

//     if (!user || user !== "student" || !token || token.length === 0) {
//       localStorage.removeItem("user");
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("email");
//       localStorage.removeItem("otp");
//       localStorage.removeItem("roomId");
//       navigate("/");
//     }
//     const response = await fetch(
//       `${process.env.REACT_APP_WEBSITE_LINK}/student/chooseRoom`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           studentToken: token,
//           floorId: floor,
//         }),
//       }
//     );
//     let resData = await response.json();
//     if (response.status === 400) {
//       // //console.log(resData.error);
//       setSubmitErrors([]);
//       setSuccess("");
//       setError(resData.error);
//       if (resData.error === "Access denied") {
//         localStorage.removeItem("user");
//         localStorage.removeItem(`${user}Token`);
//         localStorage.removeItem("email");
//         localStorage.removeItem("otp");
//         localStorage.removeItem("roomId");
//         setTimeout(() => {
//           navigate(`/`);
//         }, 1000);
//       }
//       // //console.log(error)
//     } else if (response.status === 200) {
//       resData = JSON.parse(
//         CryptoJS.AES.decrypt(
//           resData,
//           process.env.REACT_APP_BACKEND_MASTER_KEY
//         ).toString(CryptoJS.enc.Utf8)
//       );

//       setError("");
//       setSubmitErrors([]);
//       setRooms(resData);
//       setSuccess("Successfully Got Rooms Data");
//     } else if (response.status === 500) {
//       setError("Internal Server Error. Please Try Again later");
//     }
//     setTimeout(() => {
//       handleClick();
//     }, 100);
//   };

//   useEffect(() => {
//     if (floor.length !== 0) {
//       getRoomDetails();
//     }
//   }, [floor]);

//   const handleHostelChange = (event) => {
//     setRooms([]);
//     setFloors([]);
//     setBlocks([]);
//     setHostel(event.target.value);
//   };
//   const handleBlockChange = (event) => {
//     setRooms([]);
//     setFloors([]);
//     setBlock(event.target.value);
//   };
//   const handleFloorChange = (event) => {
//     setRooms([]);
//     setFloor(event.target.value);
//   };
//   const handleRoomChange = (event) => {
//     setRoom(event.target.value);
//   };
//   // transactionSubmit

//   const handleProceed = async () => {
//     const encUser = localStorage.getItem("user");
//     const user = decrypt(encUser ? encUser : "");
//     const encToken = localStorage.getItem(`${user}Token`);
//     const token = decrypt(encToken ? encToken : "");

//     if (!user || user !== "student" || !token || token.length === 0) {
//       localStorage.removeItem("user");
//       localStorage.removeItem(`${user}Token`);
//       localStorage.removeItem("email");
//       localStorage.removeItem("otp");
//       localStorage.removeItem("roomId");
//       navigate("/");
//     }
//     if (room.length > 0) {
//       console.log(room);
//       localStorage.setItem("roomId", encrypt(room));
//       setTimeout(() => {
//         navigate("/upload_transaction");
//       }, 100);
//     } else {
//       setSubmitErrors([]);
//       setError("Please Select a Room First");
//       handleClick();
//     }
//   };

  return (
    <div className={styles.container}>
      <Paper className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.formDiv}>
            <span className={styles.formDivFirst}>Hostel</span>
            <span className={styles.formDivSecond}>
              <FormControl
                sx={{ m: 1, width: "100%" }}
                style={{ margin: "0px" }}
              >
                <InputLabel id="hostel-label">Hostel</InputLabel>
                <Select
                  labelId="hostel-label"
                  value={hostel}
                  label="Hostel"
                //   onChange={handleHostelChange}
                >
                  {
                    // hostelNo: { type: Number, required: true },
                    // hostelName: { type: String },
                    // branch: { type: String, required: true },
                    // year: { type: Number, required: true },
                    hostels.map((hostel) => {
                      return (
                        <MenuItem value={hostel._id}>
                          {hostel.hostelName}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>
            </span>
          </div>
          <div className={styles.formDiv}>
            <span className={styles.formDivFirst}>Block No.</span>
            <span className={styles.formDivSecond}>
              <FormControl
                sx={{ m: 1, width: "100%" }}
                style={{ margin: "0px" }}
              >
                <InputLabel id="block-label">Block</InputLabel>
                <Select
                  labelId="block-label"
                  value={block}
                  label="Block"
                //   onChange={handleBlockChange}
                >
                  {blocks.map((block) => {
                    return <MenuItem value={block._id}>{block.block}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </span>
          </div>
          <div className={styles.formDiv}>
            <span className={styles.formDivFirst}>Floor No.</span>
            <span className={styles.formDivSecond}>
              <FormControl
                sx={{ m: 1, width: "100%" }}
                style={{ margin: "0px" }}
              >
                <InputLabel id="floor-label">Floor</InputLabel>
                <Select
                  labelId="floor-label"
                  value={floor}
                  label="Floor"
                //   onChange={handleFloorChange}
                >
                  {floors.map((floor) => {
                    return (
                      <MenuItem value={floor._id}>{floor.floorNo}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </span>
          </div>
          <div className={styles.formDiv}>
            <span className={styles.formDivFirst}>Room No.</span>
            <span className={styles.formDivSecond}>
              <FormControl
                sx={{ m: 1, width: "100%" }}
                style={{ margin: "0px" }}
              >
                <InputLabel id="room-label">Room</InputLabel>
                <Select
                  labelId="room-label"
                  value={room + ""}
                  label="Room"
                //   onChange={handleRoomChange}
                >
                  {
                    // bedNo : {type : Number, required : true},
                    // roomNo: { type: Number , required : true},
                    // floorId: { type: mongoose.Schema.Types.ObjectId, required: true },
                    // tempLocked : {type : Boolean, default: false},
                    // permanentLocked : {type : Boolean , default : false}
                    rooms.map((room) => {
                      return (
                        <MenuItem value={room._id}>{room.roomNo}</MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>
            </span>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            variant="contained"
            // onClick={() => handleProceed()}
            className={styles.proceedButton}
          >
            Proceed
          </Button>
        </div>
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

export default ChooseRoom;
