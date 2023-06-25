import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from "../../styles/checkTransaction.module.css"; 

const CheckTransaction = ({ details, handleGoBack }) => {
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!details || !details.fileURL) {
            setPreview(undefined);
            return;
        }

        // create the preview
        const objectUrl = URL.createObjectURL(details.fileURL);
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
     }, [])
    
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerText}>
                Transaction Details
            </div>
            <div className={styles.headerIcon} onClick={handleGoBack} >
                <CloseIcon style={{width: '100%', height: '100%'}} />
            </div>
        </div>
        <div className={styles.upload}>
            <img src={preview} alt="File Preview" />
        </div>
        <div className={styles.footer}>
            <div className={styles.footerFirst}>Tx ID</div>
            <div className={styles.footerSecond}>{details ? details.transactionId : 'No Data' }</div>
        </div>
        {
            details ? details.remark.length > 0 ? 
            (
                <div className={styles.footer}>
                    <div className={styles.footerFirst}>Reason</div>
                    <div className={styles.footerSecond}>{details ? details.remark : 'No Data' }</div>
                </div>
            )
            :
            <></>
            :
            <></>
        }
        
    </div>
  )
}

export default CheckTransaction