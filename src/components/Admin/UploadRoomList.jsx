import React from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from "../../styles/uploadRoomList.module.css"; 
import UploadFile from "./UploadFile.jsx"

const UploadRoomList = ({ handleGoBack, files, setFiles , handleRoomList}) => {
    const handleProceed = () => {
      handleRoomList();
    }
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerText}>
              Upload Room List
            </div>
            <div className={styles.headerIcon} onClick={handleGoBack} >
                <CloseIcon style={{width: '100%', height: '100%'}} />
            </div>
        </div>
        {/* <div className={styles.upload}>Upload File</div> */}

        <div className={styles.upload}>
          <UploadFile files={files} setFiles={setFiles}  />
        </div>

        <div className={styles.buttonWrapper}>
         <Button variant="contained" onClick={() => handleProceed()} className={styles.proceedButton}>Proceed</Button>
        </div>
    </div>
  )
}

export default UploadRoomList