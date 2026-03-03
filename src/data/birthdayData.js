import heroImg from "../assets/images/hero.jpg";

import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";

import memory1 from "../assets/videos/memory1.mp4";
import memory2 from "../assets/videos/memory2.mp4";

import bgmSong from "../assets/audio/nastelbom-happy-birthday-469282.mp3";

export const birthdayData = {
  person: {
    name: "Your Favorite Person",
    nickname: "Spcial Friend Debora ",
    birthdayDateText: "match 04, 2025",
  },

  hero: {
    title: "Happy Birthday 🎉",
    subtitle:
      "Wishing you a day filled with love, laughter, and unforgettable memories.",
    image: heroImg,
    badge: "for my Special Friend 💛",
  },

  countdown: {
    month: 1,
    day: 25,
    time: "00:00",
    label: "Countdown to the big day 🎉",
  },

  favorites: [
    { title: "Favorite Food", value: "Panner 🍕", note: "Extra cheese always!" },
    { title: "Favorite Drink", value: "Iced Coffee ☕", note: "No sugar, please." },
    { title: "Favorite Song", value: "Anjali 🎵", note: "Instant mood booster." },
    { title: "Favorite Place", value: "Beach 🌊", note: "Sunset walks." },
  ],

  gallery: [
    { src: pic1, caption: "That day we couldn’t stop laughing 😂" },
    { src: pic2, caption: "A perfect candid moment ✨" },
    { src: pic3, caption: "One of my favorites 💛" },
    { src: pic4, caption: "2nd Birthday 💛" },
    { src: pic5, caption: "2nd Birthday 💛" },
    { src: pic6, caption: "2nd Birthday 💛" },
   
  ],

  videos: [
    {
      src: memory1,
      title: "Memory Reel #1",
      description: "Small moments, big meaning.",
    },
    {
      src: memory2,
      title: "Memory Reel #2",
      description: "A highlight of the best times.",
    },
  ],

  timeline: [
    { year: "2019", title: "The start of something special", text: "A year we’ll always remember." },
    { year: "2021", title: "Big wins & bigger smiles", text: "So many milestones together." },
    { year: "2024", title: "New adventures", text: "More stories, more joy." },
  ],

  funFacts: [
    "Strong friendships are linked to longer, healthier lives..",
    "They're the best source of happiness.",
    "Can turn any bad day into a good one.",
    "Makes the best playlists.",
   
  ],

  bgMusic: {
    src: bgmSong,
    title: "Happy Birthday (nastelbom)",
  },

  spotifyPlaylist: {
    title: "Birthday Playlist",
    subtitle: "A little Spotify-style list (tap a song to play).",
    coverImage: heroImg,
    tracks: [
      {
        id: "t1",
        title: "Happy Birthday (Background Mix)",
        artist: "For You 💛",
        src: bgmSong,
        durationText: "—",
      },
      {
        id: "t2",
        title: "Sunshine Vibes",
        artist: "Special Friend ✨",
        src: bgmSong,
        durationText: "—",
      },
      {
        id: "t3",
        title: "Cake & Candles",
        artist: "Birthday Mode 🎂",
        src: bgmSong,
        durationText: "—",
      },
    ],
  },

  surpriseMessages: [
    "You are one of the best people ever 💛",
    "Today is special because YOU exist ✨",
    "Your smile makes everything better 😄",
    "Keep shining like always 🌟",
    "You deserve all happiness 🎉",
  ],
};
