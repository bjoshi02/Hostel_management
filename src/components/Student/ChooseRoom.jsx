import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from "../../styles/chooseRoom.module.css";

const ChooseRoom = () => {
  const [hostel, setHostel] = React.useState('');
  const [block, setBlock] = React.useState('');
  const [floor, setFloor] = React.useState('');
  const [room, setRoom] = React.useState('');

  const handleHostelChange = (event) => {
    setHostel(event.target.value);
  };
  const handleBlockChange = (event) => {
    setBlock(event.target.value);
  };
  const handleFloorChange = (event) => {
    setFloor(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const handleProceed = () => {

  };

  return (
    <div className={styles.container}>
        <Paper className={styles.wrapper}>    
            <div className={styles.formWrapper}>
                <div className={styles.formDiv}>
                    <span className={styles.formDivFirst}>Hostel</span>
                    <span className={styles.formDivSecond}>
                        <FormControl sx={{ m: 1, width: '100%'}} style={{ margin: '0px'}}>
                            <InputLabel id="hostel-label">Hostel</InputLabel>
                            <Select
                                labelId="hostel-label"
                                value={hostel}
                                label="Hostel"
                                onChange={handleHostelChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div>
                <div className={styles.formDiv}>
                    <span className={styles.formDivFirst}>Block No.</span>
                    <span className={styles.formDivSecond}>
                        <FormControl sx={{ m: 1, width: '100%'}} style={{ margin: '0px'}}>
                            <InputLabel id="block-label">Block</InputLabel>
                            <Select
                                labelId="block-label"
                                value={block}
                                label="Block"
                                onChange={handleBlockChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div>
                <div className={styles.formDiv}>
                    <span className={styles.formDivFirst}>Floor No.</span>
                    <span className={styles.formDivSecond}>
                        <FormControl sx={{ m: 1, width: '100%'}} style={{ margin: '0px'}}>
                            <InputLabel id="floor-label">Floor</InputLabel>
                            <Select
                                labelId="floor-label"
                                value={floor}
                                label="Floor"
                                onChange={handleFloorChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div>
                <div className={styles.formDiv}>
                    <span className={styles.formDivFirst}>Room No.</span>
                    <span className={styles.formDivSecond}>
                        <FormControl sx={{ m: 1, width: '100%'}} style={{ margin: '0px'}}>
                            <InputLabel id="room-label">Room</InputLabel>
                            <Select
                                labelId="room-label"
                                value={room}
                                label="Room"
                                onChange={handleRoomChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                    <Button variant="contained" onClick={() => handleProceed()} className={styles.proceedButton}>Proceed</Button>
            </div>
        </Paper>
    </div>
  )
}

export default ChooseRoom