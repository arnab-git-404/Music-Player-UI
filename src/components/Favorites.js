// src/components/Favorites.js
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MusicContext } from '../context/MusicContext';
import SongItem from './SongItem';
import '../styles/Favorites.scss';

const Favorites = () => {
  const { favorites } = useContext(MusicContext);

  return (
    <div className="favorites-list">
      <h2 className="section-title">Favorites</h2>
      
      {favorites.length === 0 ? (
        <div className="no-favorites-message">
          <p>You haven't added any favorites yet.</p>
          <p>Click on the three dots next to a song and select "Add to Favorites".</p>
        </div>
      ) : (
        <ListGroup className="songs-container">
          {favorites.map((song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Favorites;