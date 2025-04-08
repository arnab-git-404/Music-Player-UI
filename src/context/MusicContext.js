
// src/context/MusicContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';
import songs from '../data/songs';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songList, setSongList] = useState(songs);
  const [favorites, setFavorites] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dominantColor, setDominantColor] = useState('rgb(33, 33, 33)');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('songs');
  
  const audioRef = useRef(new Audio());
  
  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    
    const storedRecent = JSON.parse(sessionStorage.getItem('recentlyPlayed') || '[]');
    setRecentlyPlayed(storedRecent);
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Update sessionStorage when recently played changes
  useEffect(() => {
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNextSong();
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [/* Dependencies will be added later */]);

  // Filter songs based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSongList(filtered);
    } else {
      setSongList(songs);
    }
  }, [searchTerm]);

  // Load new song
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.musicUrl;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => console.error("Audio playback failed:", error));
      }
    }
  }, [currentSong]); // Only depend on currentSong
  
  // Effect for handling play/pause state
  useEffect(() => {
    if (currentSong) {
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => console.error("Audio playback failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Add to recently played
    const isInRecentlyPlayed = recentlyPlayed.some(track => track.id === song.id);
    
    if (!isInRecentlyPlayed) {
      const updatedRecent = [song, ...recentlyPlayed].slice(0, 10);
      setRecentlyPlayed(updatedRecent);
    } else {
      // Move to top if already in list
      const filtered = recentlyPlayed.filter(track => track.id !== song.id);
      setRecentlyPlayed([song, ...filtered]);
    }
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    } else if (songList.length > 0) {
      playSong(songList[0]);
    }
  };

  const playNextSong = () => {
    if (!currentSong) return;
    
    const currentIndex = songList.findIndex(song => song.id === currentSong.id);
    if (currentIndex < songList.length - 1) {
      playSong(songList[currentIndex + 1]);
    } else {
      playSong(songList[0]); // Loop back to first song
    }
  };

  const playPreviousSong = () => {
    if (!currentSong) return;
    
    const currentIndex = songList.findIndex(song => song.id === currentSong.id);
    if (currentIndex > 0) {
      playSong(songList[currentIndex - 1]);
    } else {
      playSong(songList[songList.length - 1]); // Loop to last song
    }
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFavorite = (song) => {
    const isFavorite = favorites.some(track => track.id === song.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(track => track.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  const isFavorite = (song) => {
    return favorites.some(track => track.id === song.id);
  };

  const updateDominantColor = (color) => {
    setDominantColor(color);
  };

  return (
    <MusicContext.Provider 
      value={{
        currentSong,
        isPlaying,
        songList,
        favorites,
        recentlyPlayed,
        currentTime,
        duration,
        dominantColor,
        searchTerm,
        activeTab,
        audioRef, // Add audioRef to context
        playSong,
        togglePlay,
        playNextSong,
        playPreviousSong,
        seekTo,
        toggleFavorite,
        isFavorite,
        updateDominantColor,
        setSearchTerm,
        setActiveTab
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};