// src/components/RecentlyPlayed.js
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MusicContext } from '../context/MusicContext';
import SongItem from './SongItem';
import '../styles/RecentlyPlayed.scss';

const RecentlyPlayed = () => {
  const { recentlyPlayed } = useContext(MusicContext);

  return (
    <div className="recently-played-list">
      <h2 className="section-title">Recently Played</h2>
      
      {recentlyPlayed.length === 0 ? (
        <div className="no-history-message">
          <p>You haven't played any songs yet.</p>
          <p>Your recently played songs will appear here.</p>
        </div>
      ) : (
        <ListGroup className="songs-container">
          {recentlyPlayed.map((song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default RecentlyPlayed;