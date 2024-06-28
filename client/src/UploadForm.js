// src/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setMatches(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {matches.map((match, index) => (
          <div key={index}>
            <p>{match.team1?.name} ({match.team1?.team}-{match.team1?.rating}) vs {match.team2?.name} ({match.team2?.team}-{match.team2?.rating})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadForm;
