import React from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from "../../styles/checkTransaction.module.css"; 

const CheckTransaction = ({ handleGoBack }) => {
    
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerText}>
                Check Transaction
            </div>
            <div className={styles.headerIcon} onClick={handleGoBack} >
                <CloseIcon style={{width: '100%', height: '100%'}} />
            </div>
        </div>
        <div className={styles.upload}>Uploaded File</div>
        <div className={styles.footer}>
            <div className={styles.footerFirst}>Tx ID</div>
            <div className={styles.footerSecond}>0000 0000 0000 0000</div>
        </div>
    </div>
  )
}

export default CheckTransaction