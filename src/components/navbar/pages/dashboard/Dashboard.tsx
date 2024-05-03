import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './modal.css'; 
Modal.setAppElement('#root'); // Set the root element for the modal

const Dashboard: React.FC = () => {
  const history = useNavigate();
  const [dataMusic, setDataMusic] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const checkAuth = async () => {
    const token = localStorage.getItem('tk');
    if (!token) {
      history('/');
      return false;
    }
    try {
      const response = await axios.get('https://discomusic-serverside.onrender.com/api/checkLogin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return true;
    } catch (error) {
      history('/');
    }
  };

  const getData = async () => {
    const id = localStorage.getItem('id');
    try {
      const response = await axios.get(`https://discomusic-serverside.onrender.com/api/music/user/${Number(id)}`);
      setDataMusic(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAuth();
      await getData();
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      console.log(title)
      // formData.append('title', title);
      // formData.append('artist', artist);
      // formData.append('file', file!);
      const id = localStorage.getItem('id');
      // console.log(formData)
      const response = await axios.post(`https://discomusic-serverside.onrender.com/api/createMusicWithoutFile`, {
        userId: Number(id),
        title: title,
        artist: artist
      });
      console.log(response)
      const musicId = response.data.data.id;
      setDataMusic(response.data.data || []);

      // Now upload the music file to the server
      const fileFormData = new FormData();
      fileFormData.append('file', file!);
    const response2 =   await axios.post(`https://discomusic-serverside.onrender.com/api/uploadNewMusic/${musicId}`, fileFormData);
console.log("response2", response2)
window.location.reload(); 
      closeModal();
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://discomusic-serverside.onrender.com/api/deleteSong/${id}`);
      await getData();
    } catch (error) {
      console.error('Error deleting music:', error);
    }
  };

  return (
    <div className="home-container">
      <button onClick={openModal}>Adicionar Música</button>
      <div className="home-content">
        <h1>Minhas Músicas</h1>
        {dataMusic.length === 0 ? (
          <p>Nenhuma música ainda.</p>
        ) : (
          <ul>
            {dataMusic.map((music: any) => (
             <li key={music.id}>
              <p>{music.title ? `Título: ${music.title}`  : "Sem Título"}</p>
              <p>{music.artist ? `Artista: ${music.artist}` : "Sem artista definido"}</p>
             {music.id} - {music.file ? <audio controls src={`https://discomusic-serverside.onrender.com/uploads/${music.file}`}></audio> : "Não possui mídia"}
             <button onClick={() => handleDelete(music.id)}>Excluir</button>
           </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
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
            <label htmlFor="file">Escolher arquivo:</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".mp3,.wav"
              required
            />
          </div>
          <button type="submit">Enviar</button>
          <button onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
