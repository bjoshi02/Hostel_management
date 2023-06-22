import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugins
// "filepond-plugin-file-encode": "^2.1.10",
//     "filepond-plugin-file-validate-type": "^1.2.8",
//     "filepond-plugin-image-exif-orientation": "^1.0.11",
//     "filepond-plugin-image-preview": "^4.6.11",
//     "react-filepond": "^7.1.2",
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode, FilePondPluginFileValidateType);

function UploadFile({files,setFiles,checked}) {

  return (
    <div>
      <FilePond
        acceptedFileTypes={['application/pdf']}
        files={files}
        allowMultiple={false}
        onupdatefiles={setFiles}
        labelIdle= {checked===false ? "Drop/Upload Hostel Reciept PDF" : "Drop/Upload Proof"}
        credits="false"
        name="attachments"
        style={{color: "red"}}
      />

    </div>
  );
}
export default UploadFile;