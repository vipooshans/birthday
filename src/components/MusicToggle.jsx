import { useEffect, useRef, useState } from "react";
import { birthdayData } from "../data/birthdayData";

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(birthdayData.bgMusic.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (!playing) {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        alert("Tap again to allow music 🎵 (Browser blocked autoplay)");
      }
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 18, right: 18, zIndex: 999 }}>
      <button className="btn" onClick={toggleMusic} style={{ fontWeight: 700 }}>
        {playing ? "🔊 Music On" : "🔇 Music Off"}
      </button>
    </div>
  );
}
