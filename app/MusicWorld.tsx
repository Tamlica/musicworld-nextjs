"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  Music,
  Repeat,
  List,
  VolumeX,
  Home,
  Plus,
  Search,
  User,
  Shuffle,
  MoreHorizontal,
  X,
  Menu,
  Eye,
  EyeOff,
} from "lucide-react";

// Type definitions
interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioUrl: string;
  duration: number;
  lyrics: string;
}

interface Playlist {
  id: number;
  name: string;
  songs: number[];
  coverArt: string;
  description: string;
}

export default function MusicPlayer() {
  // Sample songs data with original content
  const sampleSongs: Song[] = [
    {
      id: 1,
      title: "Ocean Waves",
      artist: "Nature Sounds",
      album: "Peaceful Moments",
      coverArt:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=300&fit=crop&crop=center",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
      duration: 180,
      lyrics:
        "Listen to the ocean waves,\nAs they crash upon the shore,\nFeel the peace within your soul,\nLet the stress exist no more.\n\nListen to the ocean waves,\nAs they crash upon the shore,\nFeel the peace within your soul,\nLet the stress exist no more.\n\nListen to the ocean waves,\nAs they crash upon the shore,\nFeel the peace within your soul,\nLet the stress exist no more.\n\nListen to the ocean waves,\nAs they crash upon the shore,\nFeel the peace within your soul,\nLet the stress exist no more.",
    },
    {
      id: 2,
      title: "Mountain Breeze",
      artist: "Alpine Harmony",
      album: "Natural Symphony",
      coverArt:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a",
      duration: 225,
      lyrics:
        "High up in the mountains,\nWhere the air is crystal clear,\nEvery breath brings freedom,\nEvery moment without fear.",
    },
    {
      id: 3,
      title: "City Lights",
      artist: "Urban Dreams",
      album: "Metropolitan",
      coverArt:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop&crop=center",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg",
      duration: 195,
      lyrics:
        "Neon lights paint the night,\nIn colors bold and bright,\nThe city never sleeps,\nAlways reaching new heights.",
    },
    {
      id: 4,
      title: "Forest Whispers",
      artist: "Woodland Tales",
      album: "Green Sanctuary",
      coverArt:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&crop=center",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
      duration: 210,
      lyrics:
        "Ancient trees tell stories,\nOf times long past and gone,\nIn whispers through the branches,\nFrom dusk until the dawn.",
    },
    {
      id: 5,
      title: "Desert Sunset",
      artist: "Sahara Vibes",
      album: "Golden Horizons",
      coverArt:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=300&fit=crop&crop=center",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
      duration: 240,
      lyrics:
        "Golden sands stretch endless,\nBeneath the setting sun,\nSilence speaks in volumes,\nWhen the day is finally done.",
    },
    {
      id: 6,
      title: "Rainfall Melody",
      artist: "Storm Collective",
      album: "Weather Patterns",
      coverArt:
        "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=300&h=300&fit=crop&crop=center",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.mp3",
      duration: 165,
      lyrics:
        "Raindrops on the window,\nCreate a gentle song,\nEach drop a note of music,\nThat carries us along.",
    },
  ];

  // Sample playlists
  const samplePlaylists: Playlist[] = [
    {
      id: 1,
      name: "Chill Vibes",
      songs: [1, 2, 4],
      coverArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      description: "Relaxing music for peaceful moments",
    },
    {
      id: 2,
      name: "Nature Sounds",
      songs: [1, 4, 6],
      coverArt:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&crop=center",
      description: "Connect with nature through music",
    },
    {
      id: 3,
      name: "Urban Energy",
      songs: [3, 5],
      coverArt:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop&crop=center",
      description: "High energy tracks for the city life",
    },
  ];

  // Mood categories
  const moodCategories = [
    "Podcasts",
    "Workout",
    "Relax",
    "Feel good",
    "Romance",
    "Party",
    "Energize",
    "Commute",
    "Sleep",
    "Sad",
    "Focus",
  ];

  // State management
  const [songs, setSongs] = useState<Song[]>(sampleSongs);
  const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [thumbsUp, setThumbsUp] = useState<number[]>([]);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string>("");
  const [useWebAudio, setUseWebAudio] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(sampleSongs);
  const [selectedCategory, setSelectedCategory] = useState<string>("Podcasts");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  
  // Player and Modal states
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [newPlaylistDescription, setNewPlaylistDescription] =
  useState<string>("");
  const [selectedSongsForPlaylist, setSelectedSongsForPlaylist] = useState<
  number[]
  >([]);
  
  
  // Audio player references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const currentSong = songs[currentSongIndex];

  // Get liked songs for "Episodes for Later"
  const likedSongs = songs.filter((song) => wishlist.includes(song.id));

  // Format time display (mm:ss)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  
  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase()) ||
          song.album.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };

  // Category filter functionality
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "Relax") {
      setFilteredSongs(
        songs.filter(
          (song) =>
            song.title.toLowerCase().includes("ocean") ||
            song.title.toLowerCase().includes("mountain") ||
            song.title.toLowerCase().includes("forest")
        )
      );
    } else if (category === "Party") {
      setFilteredSongs(
        songs.filter(
          (song) =>
            song.title.toLowerCase().includes("city") ||
            song.title.toLowerCase().includes("lights")
          )
        );
      } else {
        setFilteredSongs(songs);
      }
    };
    
    // Navigation handlers
    const handleNavigation = (section: string) => {
      setSidebarOpen(false);
      setActiveSection(section);
      if (section === "playlist") {
        setFilteredSongs(songs);
      }
    };
    
    // Login states
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loggedOut, setLoggedOut] = useState(false);

  // Login handlers
  const handleLogin = () => {
    if (isLoggedIn) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      setShowLogin(true);
      setLoggedOut(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".user-menu-container") &&
        !target.closest(".user-dropdown")
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginForm({ username: "", password: "" });
    }
  };

  // Playlist handlers
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now(), 
        name: newPlaylistName,
        songs: [...selectedSongsForPlaylist], 
        coverArt:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
        description: newPlaylistDescription || "Custom playlist",
      };
      console.log("Creating playlist:", newPlaylist); 

      setPlaylists((prev) => {
        const updated = [...prev, newPlaylist];
        return updated;
      });

      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setSelectedSongsForPlaylist([]);
      setActiveSection("playlist");
      setShowNewPlaylist(false);
    }
  };

  const toggleSongInPlaylist = (songId: number) => {
    if (selectedSongsForPlaylist.includes(songId)) {
      setSelectedSongsForPlaylist(
        selectedSongsForPlaylist.filter((id) => id !== songId)
      );
    } else {
      setSelectedSongsForPlaylist([...selectedSongsForPlaylist, songId]);
    }
  };

  // Player modal handlers
  const openPlayerModal = () => {
    setShowPlayerModal(true);
  };

  const closePlayer = () => {
    setShowPlayerModal(false);
  };

  // Create a simple tone for demonstration
  const createTone = (frequency: number, duration: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume * 0.1,
      audioContext.currentTime + 0.1
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    return oscillator;
  };

  // Play a demo tone based on song
  const playDemoTone = () => {
    const frequencies = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0];
    const frequency = frequencies[currentSongIndex % frequencies.length];
    createTone(frequency, 2);
  };

  // Handle play/pause
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      setAudioError("");

      if (isPlaying) {
        audioRef.current.pause();
        stopPlayback();
        setIsPlaying(false);
      } else {
        setIsLoading(true);

        if (audioRef.current.src !== currentSong.audioUrl) {
          audioRef.current.src = currentSong.audioUrl;
        }

        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsLoading(false);
          setUseWebAudio(false);
        } catch (audioError) {
          console.log("HTML5 Audio failed, trying Web Audio API:", audioError);

          try {
            playDemoTone();
            setUseWebAudio(true);
            setIsPlaying(true);
            setIsLoading(false);
            setAudioError("Using demo audio");
            startPlayback();
          } catch (webAudioError) {
            console.log("Web Audio API also failed:", webAudioError);
            throw webAudioError;
          }
        }
      }
    } catch (error) {
      console.log("All audio methods failed, using visual playback:", error);
      setAudioError("Audio unavailable - visual playback");
      setIsLoading(false);
      setUseWebAudio(false);

      if (!isPlaying) {
        startPlayback();
        setIsPlaying(true);
      }
    }
  };

  // Start mock playback
  const startPlayback = () => {
    if (playerIntervalRef.current) {
      clearInterval(playerIntervalRef.current);
    }

    playerIntervalRef.current = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + 1;

        if (newTime >= currentSong.duration) {
          if (isLooping) {
            return 0;
          } else {
            stopPlayback();
            playNextSong();
            return 0;
          }
        }

        return newTime;
      });
    }, 1000);
  };

  // Stop mock playback
  const stopPlayback = () => {
    if (playerIntervalRef.current) {
      clearInterval(playerIntervalRef.current);
      playerIntervalRef.current = null;
    }
  };

  // Handle next song
  const playNextSong = () => {
    const newIndex = isShuffling
      ? Math.floor(Math.random() * songs.length)
      : (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);
    setAudioError("");
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      if (useWebAudio) {
        setTimeout(() => playDemoTone(), 100);
      }
    }
  };

  // Handle previous song
  const playPreviousSong = () => {
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);
    setAudioError("");
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      if (useWebAudio) {
        setTimeout(() => playDemoTone(), 100);
      }
    }
  };

  // Handle song selection
  const selectSong = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setAudioError("");
    setIsPlaying(true);
    if (useWebAudio) {
      setTimeout(() => playDemoTone(), 200);
    }
    // Open the music player modal when a song is selected
    setShowPlayerModal(true);
    setIsPlayerMinimized(false);
  };

  // Toggle wishlist (red heart)
  const toggleWishlist = (songId: number) => {
    if (wishlist.includes(songId)) {
      setWishlist(wishlist.filter((id) => id !== songId));
    } else {
      setWishlist([...wishlist, songId]);
    }
  };

  // Toggle thumbs up (blue)
  const toggleThumbsUp = (songId: number) => {
    if (thumbsUp.includes(songId)) {
      setThumbsUp(thumbsUp.filter((id) => id !== songId));
    } else {
      setThumbsUp([...thumbsUp, songId]);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : value;
    }
    if (isMuted && value > 0) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime = value;
    }
  };

  // Audio event handlers
  const handleAudioTimeUpdate = () => {
    if (audioRef.current && !isNaN(audioRef.current.currentTime)) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          setCurrentTime(0);
          startPlayback();
        });
      }
    } else {
      setIsPlaying(false);
      playNextSong();
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const actualDuration = audioRef.current.duration;
      setSongs((prevSongs) =>
        prevSongs.map((song, index) =>
          index === currentSongIndex
            ? { ...song, duration: Math.floor(actualDuration) }
            : song
        )
      );
    }
  };

  const handleAudioError = () => {
    console.log("Audio error occurred");
    setAudioError("Audio failed to load");
    setIsLoading(false);
  };

  const handleAudioCanPlay = () => {
    setIsLoading(false);
    setAudioError("");
  };

  // Effects
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      stopPlayback();

      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = isLooping;

      setCurrentTime(0);

      if (isPlaying) {
        if (useWebAudio) {
          playDemoTone();
          startPlayback();
        } else {
          setIsLoading(true);
          audioRef.current.play().catch((error) => {
            console.log("Audio play failed in useEffect:", error);
            setAudioError("Audio failed to load");
            setIsLoading(false);
            startPlayback();
          });
        }
      }
    }

    return () => {
      if (playerIntervalRef.current) {
        clearInterval(playerIntervalRef.current);
      }
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

    const [isDesktop, setIsDesktop] = useState(
      typeof window !== "undefined" ? window.innerWidth >= 768 : false
    );
  
    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Left Sidebar - Collapses to top on mobile */}
      <div
        className={`fixed md:static top-0 left-0 min-h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 z-30 md:z-10 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-60`}
      >
        {/* Logo */}
		<div className="p-4 md:p-6 flex items-center justify-start space-x-3">
			<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Music size={20} className="text-white" />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-lg md:text-xl font-bold text-white hover:text-purple-300 transition-all duration-300 hover:scale-105"
            >
              Music Player
            </button>
        </div>

        {/* Navigation - Stacked vertically */}
        <nav className="flex-1 px-2 md:px-3 overflow-x-auto md:overflow-y-auto flex flex-col gap-1 md:gap-2">
          <div className="space-y-1 md:space-y-2">
            <button
              onClick={() => handleNavigation("home")}
              className={`w-full flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 group ${
                activeSection === "home"
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/10 hover:shadow-lg"
              }`}
            >
              <Home
                size={18}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-medium text-sm md:text-base">Home</span>
            </button>
            <button
              onClick={() => handleNavigation("playlist")}
              className={`w-full flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 group ${
                activeSection === "playlist"
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/10 hover:shadow-lg"
              }`}
            >
              <List
                size={18}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-medium text-sm md:text-base">Playlist</span>
            </button>
          </div>

          <div className="mt-4 md:mt-8 px-2 py-1 md:px-3 md:py-2">
            <button
              onClick={() => setShowNewPlaylist(true)}
              className="w-full flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:backdrop-blur-sm hover:border hover:border-white/10 hover:shadow-lg transition-all duration-300 group text-sm md:text-base"
            >
              <Plus
                size={18}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-medium">New playlist</span>
            </button>
          </div>

          <div className="mt-4 md:mt-6 px-2 md:px-3 flex-1 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 md:mb-4">
              Episodes for Later
            </h3>
            {likedSongs.length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {likedSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => selectSong(song.id)}
                    className="text-xs md:text-sm text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-2 hover:bg-white/5 px-2 py-1 rounded-lg"
                  >
                    {song.title} - {song.artist}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs md:text-sm text-gray-400 px-2">
                No liked songs yet
              </p>
            )}
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col relative z-10">
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between relative">
            {/* Left: Mobile only - Logo, Title, Menu */}
            <div className="flex items-center space-x-2 z-30 md:hidden">
            <button
                onClick={() => setSidebarOpen(true)}
                className="text-white hover:text-purple-300 transition-all duration-300"
            >
                <Menu size={24} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Music size={20} className="text-white" />
            </div>
            <button
                onClick={() => window.location.reload()}
                className="text-lg font-bold text-white hover:text-purple-300 transition-all duration-300 hover:scale-105"
            >
                Music Player
            </button>
            </div>

            {/* Center/Left: Desktop Search Bar */}
            <div className="hidden md:flex w-full max-w-md">
            <div className="relative w-full">
                <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                type="text"
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-400 text-base"
                />
            </div>
            </div>

            {/* Right: Search icon (mobile) + user button (all screens) */}
            <div className="flex items-center space-x-2 md:space-x-4 z-30">
            {/* Mobile search icon */}
            <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden text-gray-400 hover:text-white"
            >
                <Search size={20} />
            </button>

            {/* User icon */}
            <button
                onClick={handleLogin}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border ${
                isLoggedIn
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-green-400/30 shadow-lg shadow-green-500/25"
                    : "bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 hover:border-white/30"
                }`}
            >
                <User size={16} className="text-white" />
            </button>
            </div>
        </div>

        {/* Fullscreen Search (Mobile only) */}
        {isSearchOpen && (
            <div className="md:hidden fixed inset-0 z-40 bg-black/90 p-4 flex items-center">
                <div className="relative w-full">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search songs..."
                        value={searchQuery}
                        autoFocus
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-white/10 backdrop-blur-sm text-white pl-10 pr-10 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-400 text-base"
                    />
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                    <X size={18} />
                    </button>
                </div>
            </div>
        )}
        </header>


        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-32 overflow-y-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl border border-white/20">
                <span className="text-lg md:text-xl font-bold text-white">
                  {isLoggedIn
                    ? loginForm.username.charAt(0).toUpperCase() || "U"
                    : "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome {isLoggedIn ? loginForm.username : "User"}
                </h1>
                <p className="text-gray-400 mt-1 text-sm md:text-base">
                  Discover your perfect soundtrack
                </p>
              </div>
            </div>
          </div>

        <div className="mb-6 md:mb-8">
            <div className="flex w-full gap-2 md:gap-3 py-1 md:py-1.5 pb-2 md:pb-0 overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal md:flex-wrap no-scrollbar">
                {moodCategories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 will-change-transform border ${
                    selectedCategory === category
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-white/30 shadow-lg shadow-purple-500/25"
                        : "bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/20 border-white/20 hover:border-white/30"
                    }`}
                >
                    {category}
                </button>
                ))}
            </div>
        </div>


          {activeSection === "playlist" && (
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Your Playlists
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-white/10 backdrop-blur-xl hover:bg-white/15 rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-300 group border border-white/20 hover:border-white/30 hover:shadow-xl hover:scale-105"
                    onClick={() => {
                      setCurrentSongIndex(0);
                      setFilteredSongs(
                        songs.filter((song) => playlist.songs.includes(song.id))
                      );
                      setActiveSection("playlist");
                    }}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="relative">
                        <img
                          src={playlist.coverArt}
                          alt={playlist.name}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg md:rounded-xl"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors duration-300 text-sm md:text-base">
                          {playlist.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-400 truncate">
                          {playlist.songs.length} songs
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {playlist.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {activeSection === "home" ? "Featured Songs" : "playlist Songs"}
              </h2>
              
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => selectSong(index)}
                  className="bg-white/10 backdrop-blur-xl hover:bg-white/15 rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-300 group border border-white/20 hover:border-white/30 hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="relative">
                      <img
                        src={song.coverArt}
                        alt={song.title}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg md:rounded-xl"></div>
                      <button className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Play
                          size={16}
                          className="text-white transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors duration-300 text-sm md:text-base">
                        {song.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 truncate">
                        {song.artist} • {formatTime(song.duration)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(song.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        size={16}
                        className={`transition-all duration-300 ${
                          wishlist.includes(song.id)
                            ? "fill-red-500 text-red-500 drop-shadow-lg"
                            : "text-gray-400 hover:text-red-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {currentSong && (
            <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-2xl border-t border-white/20 px-4 py-3 md:px-6 md:py-4 z-21">
                
                {/* --- Mobile Layout --- */}
                <div className="flex items-center justify-between md:hidden">
                
                {/* Left: Song Info + Heart */}
                <div
                    className="flex items-center space-x-3 flex-1 min-w-0"
                    onClick={openPlayerModal}
                >
                    <img
                    src={currentSong.coverArt}
                    alt={currentSong.title}
                    className="w-10 h-10 rounded-lg object-cover shadow"
                    />
                    <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                        {currentSong.title}
                    </h4>
                    <p className="text-xs text-gray-400 truncate">
                        {currentSong.artist}
                    </p>
                    </div>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(currentSong.id);
                    }}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                    <Heart
                        size={18}
                        className={`transition-all duration-300 ${
                        wishlist.includes(currentSong.id)
                            ? "fill-red-500 text-red-500 drop-shadow-lg"
                            : "hover:text-red-400"
                        }`}
                    />
                    </button>
                </div>

                {/* Right: Player Controls */}
                <div className="flex items-center space-x-2 ml-4">
                    <button
                    onClick={playPreviousSong}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                    <SkipBack size={20} />
                    </button>
                    <button
                    onClick={togglePlay}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 shadow-lg border border-white/20"
                    >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                        <Pause size={16} />
                    ) : (
                        <Play size={16} />
                    )}
                    </button>
                    <button
                    onClick={playNextSong}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                    <SkipForward size={20} />
                    </button>
                </div>
                </div>

                {/* --- Desktop Layout --- */}
                <div className="hidden md:flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                {/* Current Song Info */}
                <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                    <div className="relative">
                    <img
                        src={currentSong.coverArt}
                        alt={currentSong.title}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                    </div>
                    <div className="min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-white truncate">
                        {currentSong.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-400 truncate">
                        {currentSong.artist}
                    </p>
                    </div>
                    <button
                    onClick={() => toggleWishlist(currentSong.id)}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                    <Heart
                        size={20}
                        className={`transition-all duration-300 ${
                        wishlist.includes(currentSong.id)
                            ? "fill-red-500 text-red-500 drop-shadow-lg"
                            : "hover:text-red-400"
                        }`}
                    />
                    </button>

                    <button
                    onClick={openPlayerModal}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                    <MoreHorizontal size={20} />
                    </button>
                </div>

                {/* Player Controls */}
                <div className="flex-1 max-w-2xl">
                    <div className="flex items-center justify-center space-x-4 md:space-x-6">
                    <button
                        onClick={() => setIsShuffling(!isShuffling)}
                        className={`transition-all duration-300 hover:scale-110 ${
                        isShuffling
                            ? "text-purple-400 drop-shadow-lg"
                            : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <Shuffle size={20} />
                    </button>
                    <button
                        onClick={playPreviousSong}
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <SkipBack size={24} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 md:p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 shadow-lg border border-white/20"
                    >
                        {isLoading ? (
                        <div className="w-4 h-4 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : isPlaying ? (
                        <Pause size={20} />
                        ) : (
                        <Play size={20} />
                        )}
                    </button>
                    <button
                        onClick={playNextSong}
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <SkipForward size={24} />
                    </button>
                    <button
                        onClick={() => setIsLooping(!isLooping)}
                        className={`transition-all duration-300 hover:scale-110 ${
                        isLooping
                            ? "text-purple-400 drop-shadow-lg"
                            : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <Repeat size={20} />
                    </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3 w-full">
                    <span className="text-xs text-gray-400 min-w-[40px]">
                        {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 relative group">
                        <div className="h-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <div
                            className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-150 relative shadow-lg"
                            style={{
                            width: `${(currentTime / currentSong.duration) * 100}%`,
                            }}
                        >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        </div>
                        </div>
                        <input
                        type="range"
                        min="0"
                        max={currentSong.duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                        />
                    </div>
                    <span className="text-xs text-gray-400 min-w-[40px]">
                        {formatTime(currentSong.duration)}
                    </span>
                    </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-4 flex-1 justify-end">
                    <div className="flex items-center space-x-3">
                    <button
                        onClick={toggleMute}
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="w-24 relative group">
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150 relative shadow-lg"
                            style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                        >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        </div>
                        </div>
                        <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

      </div>

      {showPlayerModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closePlayer}
        >
          <div
            className="w-full max-w-md max-h-[95vh] overflow-y-auto bg-black/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-500 animate-in fade-in-0 zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Music size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Now Playing
                  </h3>
                </div>
                <button
                  onClick={closePlayer}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:scale-110"
                >
                  <X size={20} />
                </button>
              </div>

              {currentSong && (
                <>
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
                      <div className="relative">
                        <img
                          src={currentSong.coverArt}
                          alt={currentSong.title}
                          className="relative w-64 h-64 rounded-3xl object-cover shadow-2xl transform hover:scale-105 transition-all duration-500 border border-white/20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 truncate">
                      {currentSong.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-1">
                      {currentSong.artist}
                    </p>
                    <p className="text-lg text-gray-400">{currentSong.album}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(currentSong.duration)}</span>
                    </div>
                    <div className="relative group">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-150 relative shadow-lg"
                          style={{
                            width: `${
                              (currentTime / currentSong.duration) * 100
                            }%`,
                          }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={currentSong.duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-8 mb-3">
                    <button
                      onClick={() => setIsShuffling(!isShuffling)}
                      className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        isShuffling
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Shuffle size={20} />
                    </button>
                    <button
                      onClick={playPreviousSong}
                      className="text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <SkipBack size={24} />
                    </button>
                    <button
                      onClick={togglePlay}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 shadow-lg transform hover:scale-110 border border-white/20"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : isPlaying ? (
                        <Pause size={28} />
                      ) : (
                        <Play size={28} />
                      )}
                    </button>
                    <button
                      onClick={playNextSong}
                      className="text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <SkipForward size={24} />
                    </button>
                    <button
                      onClick={() => setIsLooping(!isLooping)}
                      className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        isLooping
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Repeat size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-center space-x-6 mb-3">
                    <button
                      onClick={() => toggleWishlist(currentSong.id)}
                      className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        wishlist.includes(currentSong.id)
                          ? "bg-red-500/20 text-red-400 shadow-lg shadow-red-500/25 border border-red-500/30"
                          : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                      }`}
                    >
                      <Heart
                        size={20}
                        className={
                          wishlist.includes(currentSong.id)
                            ? "fill-current"
                            : ""
                        }
                      />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleMute}
                      className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="flex-1 relative group">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150 relative shadow-lg"
                          style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-10 text-right">
                      {Math.round((isMuted ? 0 : volume) * 100)}
                    </span>
                  </div>

                  <div className="max-h-48 overflow-y-auto bg-white/5 backdrop-blur-md rounded-xl p-4 mt-6 border border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Lyrics</h4>
                    {currentSong?.lyrics ? (
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">
                        {currentSong.lyrics}
                        </pre>
                    ) : (
                        <p className="text-sm text-gray-400 italic">No lyrics available for this song.</p>
                    )}
                    </div>

                  {/* Audio Status */}
                  {audioError && (
                    <div className="mt-6 p-4 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-xl">
                      <p className="text-yellow-400 text-sm text-center">
                        {audioError}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show Login Modal if not logged in and showLogin is true */}
      {!isLoggedIn && showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl p-8 w-96 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Login
              </h3>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg border border-white/20"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLoggedIn && showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl p-8 w-96 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Confirm Logout
              </h3>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setLoggedOut(true);
                  setShowLogin(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg border border-white/20"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="flex-1 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logged Out Modal */}
      {loggedOut && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl p-8 w-96 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Logged Out
              </h3>
              <button
                onClick={() => setLoggedOut(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              You have been logged out successfully. Please log in again to
              continue enjoying your music.
            </p>
            <button
              onClick={() => {
                setLoggedOut(false);
                setShowLogin(true);
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg border border-white/20"
            >
              Login Again
            </button>
          </div>
        </div>
      )}

      {showNewPlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl p-8 w-96 max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create New Playlist
              </h3>
              <button
                onClick={() => setShowNewPlaylist(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Playlist Name
                </label>
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter playlist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Songs
                </label>
                <div className="space-y-3 max-h-40 overflow-y-auto bg-white/5 rounded-xl p-4 border border-white/10">
                  {songs.map((song) => (
                    <label
                      key={song.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors duration-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSongsForPlaylist.includes(song.id)}
                        onChange={() => toggleSongInPlaylist(song.id)}
                        className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500/50"
                      />
                      <span className="text-white text-sm">
                        {song.title} - {song.artist}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCreatePlaylist}
                disabled={!newPlaylistName.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Create Playlist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onError={handleAudioError}
        onCanPlay={handleAudioCanPlay}
        preload="metadata"
        className="hidden"
      />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-0 {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in-95 {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in-0 {
          animation: fade-in-0 0.5s ease-out;
        }
        .zoom-in-95 {
          animation: zoom-in-95 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}