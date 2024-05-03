import React, { useState } from 'react';
import Modal from 'react-modal';
import './modal.css'; // Import the CSS file

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (musicData: FormData) => void; // Change the type to FormData
}

const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState<File | null>(null); // State to store the selected file

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!file) return; // Prevent submission if no file is selected

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      // formData.append('file', file); // Append the selected file to FormData
      await onUpload(formData);
      console.log(formData)
    } catch (error) {
      console.error('Error uploading music:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <h2>Adicionar Música</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artista:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          {/* Input for selecting a file */}
          <label htmlFor="file">Escolher arquivo:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".mp3,.wav" // Specify accepted file types
            // required
          />
        </div>
        <button type="submit">Enviar</button>
        <button onClick={onClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default MusicModal;
