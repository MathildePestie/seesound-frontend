import { useState } from "react";

const UploadAudio = ({ onFileSelected }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelected(selectedFile); 
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {file && <p>Fichier sélectionné : {file.name}</p>}
    </div>
  );
};

export default UploadAudio;