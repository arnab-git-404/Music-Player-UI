// src/components/SongList.js
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MusicContext } from '../context/MusicContext';
import SongItem from './SongItem';
import '../styles/SongList.scss';

const SongList = () => {
  const { songList } = useContext(MusicContext);

  return (
    <div className="song-list">
      <h2 className="section-title">All Songs</h2>
      
      {songList.length === 0 ? (
        <div className="no-songs-message">
          <p>No songs found. Try a different search term.</p>
        </div>
      ) : (
        <ListGroup className="songs-container">
          {songList.map((song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </ListGroup>
      )}



      
    </div>
  );
};

export default SongList;