// src/components/SongItem.js
import React, { useContext, useState } from "react";
import { ListGroup, Dropdown } from "react-bootstrap";
import {
  FaPlay,
  FaPause,
  FaEllipsisH,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { MusicContext } from "../context/MusicContext";
import "../styles/SongItem.scss";

const SongItem = ({ song }) => {
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    isFavorite,
    toggleFavorite,
  } = useContext(MusicContext);
  const [showOptions, setShowOptions] = useState(false);

  const isActive = currentSong && currentSong.id === song.id;

  const handlePlayClick = () => {
    if (isActive) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  return (
    <ListGroup.Item
      className={`song-item ${isActive ? "active" : ""}`}
      onClick={() => !isActive && playSong(song)}
    >
      <div className="song-info">


        <div className="song-thumbnail">
          <img src={song.thumbnail} alt={song.title} />
          <button
            className="play-button"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayClick();
            }}
          >
            {isActive && isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        <div className="song-details">
          <h4 className="song-title">{song.title}</h4>
          <p className="artist-name">{song.artistName}</p>
          <span className="song-duration">{song.duration}</span>
        </div>

        <div className="song-actions">
        </div>

      </div>

      <div className="song-actions">
        {/* <Dropdown 
          show={showOptions}
          onToggle={(isOpen) => setShowOptions(isOpen)}
          onClick={(e) => e.stopPropagation()}
        >
          <Dropdown.Toggle 
            as="div" 
            className="options-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            <FaEllipsisH />
          </Dropdown.Toggle>
          


          <Dropdown.Menu>
            <Dropdown.Item 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(song);
              }}
            >
              {isFavorite(song) ? (
                <>
                  <FaHeart className="favorite-icon" /> Remove from Favorites
                </>
              ) : (
                <>
                  <FaRegHeart className="favorite-icon" /> Add to Favorites
                </>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>



        </Dropdown>
      
       */}
      </div>

      
    </ListGroup.Item>
  );
};

export default SongItem;
