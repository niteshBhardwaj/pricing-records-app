import React, { useContext, useState } from "react";
import {
  PricingRecordsContext,
  PricingRecordsContextValue
} from "../PricingRecordsContext";

export const FileUploader = () => {
  const { uploadPricingRecords } = useContext(
    PricingRecordsContext
  ) as PricingRecordsContextValue;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (!file || file.type !== 'text/csv') {
        setErrorMessage('Please upload a valid CSV file.');
        return;
      }
      setErrorMessage(null);
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadPricingRecords(selectedFile);
    } else {
      setErrorMessage("Please select a file to upload");
    }
  };

  return (
    <div className="pricing-record-form upload-form">
      <p> Upload CSV file </p>
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
