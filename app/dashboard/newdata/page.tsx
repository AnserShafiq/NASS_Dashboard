'use client'
import { useState } from "react";

export default function Page(){
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    };
    const handleUpload = async () => {
        if (!file) {
          alert("Please select a file first!");
          return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        const response = await fetch("/api/upload/file", {
          method: "POST",
          body: formData,
        });
    
        if (response.ok) {
          alert("File uploaded and processed successfully!");
        } else {
          alert("Error uploading file.");
        }
      };

    return(
        <form onSubmit={handleUpload}>
            <input type='file' name='file' id='file' onChange={handleFileChange} accept=".xlsx, .xls" />
            <button type='submit'>Submit</button>
        </form>
    )
}