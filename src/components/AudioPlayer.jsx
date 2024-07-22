// src/components/AudioPlayer.jsx
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get('http://localhost:5000/playlist');
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylist();
  }, []);

  const handleEnded = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);

    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Set volume to 20%
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [currentTrack]);

  return (
    playlist.length > 0 && (
      <div>
        <audio
          ref={audioRef}
          src={playlist[currentTrack].path}
          onEnded={handleEnded}
          autoPlay={false}
          loop={false}  // We handle looping manually
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  );
};

export default AudioPlayer;
