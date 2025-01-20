"use client";
import * as XLSX from "xlsx";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  // eslint-disable-next-line
  const [excelData, setExcelData] = useState<any[]>([]); // State to store the parsed data

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Store the selected file in state
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      console.error("No file selected!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;

      const workbook = XLSX.read(e.target.result as string, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet name
      const worksheet = workbook.Sheets[sheetName]; // Get the first sheet
      const data = XLSX.utils.sheet_to_json(worksheet); // Convert to JSON
      setExcelData(data); // Store parsed data in state
    };

    reader.readAsBinaryString(file); // Read the file as binary string
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
          accept=".xlsx, .xls"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display parsed Excel data */}
      {excelData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Data:</h3>
          <table border={1} cellPadding="10">
            <thead>
              <tr>
                {/* Generate table headers dynamically based on keys */}
                {Object.keys(excelData[0]).map((key) => (
                  <th className="border-2 text-start uppercase" key={key}>{key.replace(/_/g, " ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, idx) => (
                    <td className="border-2" key={idx}>{val as React.ReactNode}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
