import React, { useContext, useEffect, useState, useRef } from "react";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"; // Import volume icons
import { Container, Row, Col } from "react-bootstrap";
import { MusicContext } from "../context/MusicContext";
import { ListGroup, Dropdown } from 'react-bootstrap';

import { extractDominantColor } from "../utils/colorExtractor";
import {
  FaPlay,
  FaEllipsisH,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import "../styles/MusicPlayer.scss";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    playNextSong,
    playPreviousSong,
    seekTo,
    isFavorite,
    toggleFavorite,
    updateDominantColor,
    audioRef, // Now audioRef is properly passed from context
  } = useContext(MusicContext);

    const [showOptions, setShowOptions] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state (1 = 100%)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Toggle slider visibility
  
  // Refs for click-outside detection
  const volumeControlRef = useRef(null);
  const volumeButtonRef = useRef(null);

  // Initialize volume state from audio element
  useEffect(() => {
    if (audioRef.current) {
      setVolume(audioRef.current.volume);
      setIsMuted(audioRef.current.muted);
    }
  }, [audioRef]);

  // Handle click outside to close volume panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If volume slider is shown and click is outside volume controls
      if (
        showVolumeSlider && 
        volumeControlRef.current && 
        !volumeControlRef.current.contains(event.target) &&
        volumeButtonRef.current &&
        !volumeButtonRef.current.contains(event.target)
      ) {
        setShowVolumeSlider(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeSlider]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audio.muted = newMutedState;
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    audio.volume = newVolume;
    
    // Automatically mute if volume is 0
    const shouldMute = newVolume === 0;
    setIsMuted(shouldMute);
    audio.muted = shouldMute;
  };

  const handleMouseScroll = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const delta = e.deltaY > 0 ? -0.05 : 0.05; // Scroll up increases volume, scroll down decreases
    const newVolume = Math.min(Math.max(volume + delta, 0), 1); // Clamp volume between 0 and 1
    setVolume(newVolume);
    audio.volume = newVolume;
    
    const shouldMute = newVolume === 0;
    setIsMuted(shouldMute);
    audio.muted = shouldMute;
  };

  useEffect(() => {
    if (showVolumeSlider) {
      window.addEventListener("wheel", handleMouseScroll);
    } else {
      window.removeEventListener("wheel", handleMouseScroll);
    }
    return () => window.removeEventListener("wheel", handleMouseScroll);
  }, [showVolumeSlider, volume]);

  // Format time to MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Extract color from thumbnail
  useEffect(() => {
    if (currentSong) {
      extractDominantColor(currentSong.thumbnail).then((color) =>
        updateDominantColor(color)
      );
    }
  }, [currentSong, updateDominantColor]);

  if (!currentSong) {
    return (
      <div className="music-player empty-player">
        <div className="placeholder-content">
          <div className="placeholder-artwork"></div>
          <h3>Select a song to play</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="music-player">
      <Container>
        <Row className="player-content">
          <Col xs={12} className="song-info">
            <h3 className="song-title">{currentSong.title}</h3>
            <p className="artist-name">{currentSong.artistName}</p>
          </Col>

          <Col xs={12} className="album-artwork">
            <img
              src={currentSong.thumbnail}
              alt={`${currentSong.title} cover`}
              className="cover-art"
            />
          </Col>

          <Col xs={12} className="player-controls">
            <div className="time-control">
              <span className="current-time">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime || 0}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="time-slider"
              />
              <span className="song-duration">{formatTime(duration)}</span>
            </div>

            <div className="control-buttons">


              <button className="control-btn" onClick={playPreviousSong}>
                <FaStepBackward />
              </button>

              <button className="control-btn play-btn" onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button className="control-btn" onClick={playNextSong}>
                <FaStepForward />
              </button>



              <button 
                className="control-btn favorite-btn" 
                onClick={() => toggleFavorite(currentSong)}
              >
                {isFavorite(currentSong) ? <FaHeart className="favorite-active" /> : <FaRegHeart />}
              </button>




              {/* Mute/unmute button */}
              <button 
                ref={volumeButtonRef}
                className="control-btn sound-btn" 
                onClick={() => {
                  toggleMute();
                  setShowVolumeSlider((prev) => !prev); // Toggle slider visibility
                }}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>

              {/* Volume slider */}
              {showVolumeSlider && (
                <div ref={volumeControlRef} className="volume-control-container">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className="volume-slider horizontal-slider"
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MusicPlayer;
