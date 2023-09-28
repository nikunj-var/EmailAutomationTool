import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import "./App.scss";

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(excelData);
    };
    reader.readAsBinaryString(file);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <button>Select File</button>
      </div>
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr className="tr">{data[0].map((cell,index)=>(
                <th key={index}>{cell}</th>
            ))}</tr>
          </thead>
          <tbody>
            {data.slice(1).map((row,rowIndex) => (
                <tr key={rowIndex} className="tr">
                    {row.map((cell,cellIndex)=>(
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ExcelUpload;
