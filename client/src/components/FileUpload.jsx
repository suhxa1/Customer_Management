import { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    axios.post('http://localhost:8080/api/customers/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      },
    })
      .then(() => {
        toast.success('✅ Upload successful!');
        setFile(null);
        setProgress(0);
      })
      .catch(() => {
        toast.error('❌ Upload failed!');
      })
      .finally(() => setUploading(false));
  };

  return (
    <div className="file-upload-container">
      <h2> Bulk Customer Upload</h2>

      {/* Custom Browse Button */}
      <label htmlFor="file-upload" className="browse-label">📁 Choose File</label>
      <input
        id="file-upload"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && <p className="file-name">Selected File: <strong>{file.name}</strong></p>}

      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : ' Upload Excel'}
      </button>

      {/* Upload Progress */}
      {uploading && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default FileUpload;
