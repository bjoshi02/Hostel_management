import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from "../../styles/checkTransaction.module.css"; 

const CheckTransaction = ({ details, handleGoBack }) => {

   const handleViewDetails = () => {
    // const blob = await details.fileURL.blob();
    const url = details.fileURL;
    console.log("Url", url);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
        'target', '_blank'
    );

      // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
   }
    
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
            <a target="_blank" href={details.fileURL}>View Uploaded File</a>
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