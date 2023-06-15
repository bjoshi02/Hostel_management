import React from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "filepond/dist/filepond.min.css";
import styles from "../../styles/uploadStudentList.module.css"; 
import UploadFile from "./UploadFile.jsx"

const UploadStudentList = ({ handleGoBack, files, setFiles , handleListLock}) => {
    const handleLock = () => {
      handleGoBack();
      handleListLock();
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
        {/* <div className={styles.upload}>Upload File</div> */}

        <div className={styles.upload}>
          <UploadFile files={files} setFiles={setFiles}  />
        </div>

        <div className={styles.buttonWrapper}>
         <Button variant="contained" onClick={() => handleLock()} className={styles.proceedButton}>Lock</Button>
        </div>
    </div>
  );
}

export default UploadStudentList;