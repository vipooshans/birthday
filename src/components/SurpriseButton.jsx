import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayData } from "../data/birthdayData";

export default function SurpriseButton() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState("default"); // "default" | "catTeddy"

  const catTeddyWishes = [
    "🐱🧸 Meow! Big hugs for you today — happy birthday and keep shining! ✨",
    "🐱🧸 A cuddly cat + teddy combo says: may your birthday be extra sweet and cozy! 🎂",
    "🐱🧸 Sending purrs and teddy hugs — happy birthday to the sweetest Sunshine! 🎈",
    "🐱🧸 Wish you giggles, cake, and warm hugs all day long. Happy Birthday! 🎉",
    "🐱🧸 You deserve love, joy, and all the cutest moments today. Happy Birthday! 💛",
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

  const pop = () => {
    const picked = pick(birthdayData.surpriseMessages);

    confetti({
      particleCount: 180,
      spread: 75,
      origin: { y: 0.7 },
    });

    setMsg(picked);
    setVariant("default");
    setOpen(true);
  };

  const anotherSurprise = () => {
    confetti({
      particleCount: 140,
      spread: 85,
      origin: { y: 0.65 },
    });
    setMsg(pick(catTeddyWishes));
    setVariant("catTeddy");
    setOpen(true);
  };

  return (
    <>
      <div style={{ position: "fixed", bottom: 90, right: 18, zIndex: 999 }}>
        <button className="btn" onClick={pop} style={{ fontWeight: 700 }}>
          🎁 Surprise
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="wishOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
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
                <div style={{ fontWeight: 900 }}>
                  {variant === "catTeddy" ? "Cat & Teddy Wish 🐱🧸" : "Birthday Greeting Card 🎉"}
                </div>
                <button className="btn" onClick={() => setOpen(false)} style={{ fontWeight: 700 }}>
                  Close ✖
                </button>
              </div>

              <div style={{ marginTop: 10, fontSize: 22, fontWeight: 900 }}>
                Happy Birthday, {birthdayData.person.nickname || birthdayData.person.name}! 🎂
              </div>
              {variant === "catTeddy" ? (
                <div
                  aria-hidden="true"
                  style={{
                    marginTop: 8,
                    fontSize: 40,
                    letterSpacing: 6,
                    filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.35))",
                  }}
                >
                  🐱🧸
                </div>
              ) : null}
              <p className="p" style={{ marginTop: 10 }}>
                {msg}
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <button className="btn" onClick={anotherSurprise} style={{ fontWeight: 700 }}>
                  🎁 Another surprise (🐱🧸)
                </button>
                <button className="btn" onClick={() => setOpen(false)} style={{ fontWeight: 700 }}>
                  Done ✅
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
