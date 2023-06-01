import React from 'react';
import { Button } from '@mui/material';

import styles from "../../styles/uploadRoomList.module.css"; 

const UploadRoomList = () => {
    const handleProceed = () => {

    }
  return (
    <div className={styles.container}>
        <div className={styles.header}>Upload Room List</div>
        <div className={styles.upload}>Upload File</div>
        <div className={styles.buttonWrapper}>
         <Button variant="contained" onClick={() => handleProceed()} className={styles.proceedButton}>Proceed</Button>
        </div>
    </div>
  )
}

export default UploadRoomList