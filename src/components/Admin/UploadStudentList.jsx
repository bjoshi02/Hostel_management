import React from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from "../../styles/uploadStudentList.module.css"; 

const UploadStudentList = ({ handleGoBack }) => {
    const handleProceed = () => {

    }
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerText}>
              Upload Student List
            </div>
            <div className={styles.headerIcon} onClick={handleGoBack} >
                <CloseIcon style={{width: '100%', height: '100%'}} />
            </div>
        </div>
        <div className={styles.upload}>Upload File</div>
        <div className={styles.buttonWrapper}>
         <Button variant="contained" onClick={() => handleProceed()} className={styles.proceedButton}>Proceed</Button>
        </div>
    </div>
  )
}

export default UploadStudentList