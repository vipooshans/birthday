import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { birthdayData } from "../data/birthdayData";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SpotifyPlaylist() {
  const playlist = birthdayData.spotifyPlaylist;
  const tracks = playlist?.tracks ?? [];

  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);

  const current = tracks[idx] ?? tracks[0];

  const coverStyle = useMemo(() => {
    const img = playlist?.coverImage;
    return img
      ? { backgroundImage: `url(${img})` }
      : {
          backgroundImage:
            "linear-gradient(135deg, rgba(255,95,162,0.45), rgba(190,105,255,0.35))",
        };
  }, [playlist]);

  useEffect(() => {
    if (!current?.src) return;
    const audio = new Audio(current.src);
    audioRef.current = audio;
    audio.volume = volume;
    audio.preload = "metadata";

    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
      next();
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(rafRef.current);
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
      setCurrentTime(0);
      setDuration(0);
      setPlaying(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const tick = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime || 0);
    rafRef.current = requestAnimationFrame(tick);
  };

  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlaying(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    } catch (err) {
      alert("Tap play again to allow audio 🎵 (Browser blocked it)");
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
  };

  const toggle = () => (playing ? pause() : play());

  const prev = () => {
    setIdx((v) => (tracks.length ? (v - 1 + tracks.length) % tracks.length : 0));
  };

  const next = () => {
    setIdx((v) => (tracks.length ? (v + 1) % tracks.length : 0));
  };

  const select = async (newIdx) => {
    setIdx(newIdx);
    // allow the new audio instance to mount first
    setTimeout(() => {
      play();
    }, 0);
  };

  const seek = (pct) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = clamp(pct, 0, 1) * duration;
    setCurrentTime(audioRef.current.currentTime || 0);
  };

  return (
    <section className="section" id="music">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="h2">Spotify Playlist 🎧</h2>
          <p className="p">{playlist?.subtitle}</p>
        </motion.div>

        <div className="spotifyWrap" style={{ marginTop: 16 }}>
          <div className="spotifyHeader">
            <div className="spotifyCover" style={coverStyle} />
            <div style={{ minWidth: 0 }}>
              <div className="spotifyTitle">{playlist?.title}</div>
              <div className="spotifyMeta">
                <span className="badge">Made for {birthdayData.person.nickname || birthdayData.person.name}</span>
                <span className="badge">Songs: {tracks.length}</span>
              </div>
            </div>
          </div>

          <div className="spotifyTable">
            <div className="spotifyRow spotifyHead">
              <div>#</div>
              <div>Title</div>
              <div className="spotifyHideSm">Artist</div>
              <div style={{ textAlign: "right" }}>⏱</div>
            </div>

            {tracks.map((t, i) => {
              const active = current?.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`spotifyRow spotifyItem ${active ? "isActive" : ""}`}
                  onClick={() => select(i)}
                >
                  <div className="spotifyIndex">{active && playing ? "▌▌" : active ? "▶" : i + 1}</div>
                  <div className="spotifyTitleCell">
                    <div className="spotifyTrackTitle">{t.title}</div>
                    <div className="spotifyTrackSub">{t.artist}</div>
                  </div>
                  <div className="spotifyHideSm spotifyArtist">{t.artist}</div>
                  <div className="spotifyDur">{t.durationText || "—"}</div>
                </button>
              );
            })}
          </div>

          <div className="spotifyPlayer">
            <div className="spotifyNow">
              <div className="spotifyNowCover" style={coverStyle} />
              <div style={{ minWidth: 0 }}>
                <div className="spotifyNowTitle">{current?.title || "—"}</div>
                <div className="spotifyNowArtist">{current?.artist || "—"}</div>
              </div>
            </div>

            <div className="spotifyControls">
              <div className="spotifyBtns">
                <button className="spotifyIconBtn" onClick={prev} aria-label="Previous">⏮</button>
                <button className="spotifyPlayBtn" onClick={toggle} aria-label="Play/Pause">
                  {playing ? "⏸" : "▶"}
                </button>
                <button className="spotifyIconBtn" onClick={next} aria-label="Next">⏭</button>
              </div>

              <div className="spotifyProg">
                <div className="spotifyTime">{formatTime(currentTime)}</div>
                <div
                  className="spotifyBar"
                  role="slider"
                  aria-label="Seek"
                  tabIndex={0}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    seek(pct);
                  }}
                >
                  <div className="spotifyBarFill" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
                </div>
                <div className="spotifyTime">{formatTime(duration)}</div>
              </div>
            </div>

            <div className="spotifyVol">
              <div className="spotifyVolIcon">🔊</div>
              <input
                className="spotifyVolRange"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

