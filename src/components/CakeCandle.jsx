import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayData } from "../data/birthdayData";

export default function CakeCandle() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(birthdayData.bgMusic.src);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.9;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const playSong = async () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (err) {
      alert("Tap again to allow audio 🎵 (Browser blocked it)");
    }
  };

  const stopSong = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const openWish = async () => {
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.7 },
    });
    setOpen(true);
    await playSong();
  };

  const closeWish = () => {
    setOpen(false);
    stopSong();
  };

  const { person } = birthdayData;
  const toName = person.nickname || person.name;

  return (
    <>
      <div className="cakeArea">
        <div className="cakeHint">Click the candle ✨</div>
        <div className="cakeStage" aria-hidden="true">
          <div className="cakeEmoji">🎂</div>
          <button
            type="button"
            className={`candleBtn ${open ? "isLit" : ""}`}
            aria-label="Click the candle to open a birthday wish"
            onClick={openWish}
          >
            <span className="candleStick" />
            <span className="candleFlame" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="wishOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWish}
          >
            <motion.div
              className="wishCard card"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="wishTopRow">
                <div style={{ fontWeight: 900 }}>Birthday Wish 💌</div>
                <button className="btn" onClick={closeWish} style={{ fontWeight: 700 }}>
                  Close ✖
                </button>
              </div>

              <div style={{ marginTop: 10, fontSize: 22, fontWeight: 900 }}>
                Happy Birthday to my absolute best friend! 🎉💖
              </div>
              <p className="p" style={{ marginTop: 10 }}>
                May your day be filled with love, laughter, and sweet surprises. You deserve the best today and always. 💛
              </p>
              <p className="p" style={{ marginTop: 10 }}>
                I’m so grateful to have you in my life. Thank you for the endless laughs, the deep talks, the crazy
                memories, and for always having my back. You make life brighter just by being in it.
              </p>
              <p className="p" style={{ marginTop: 10 }}>
                May this year bring you everything you’ve been wishing for and more — success, happiness, love, and
                countless new adventures. You truly deserve the world! 🌟
              </p>
              <p className="p" style={{ marginTop: 10 }}>
                Cheers to many more birthdays together! 🥳🎂
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <button className="btn" onClick={playSong} style={{ fontWeight: 700 }}>
                  🔁 Play song again
                </button>
                <button className="btn" onClick={stopSong} style={{ fontWeight: 700 }}>
                  ⏸ Stop song
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

