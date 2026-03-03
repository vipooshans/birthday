import { useMemo, useState } from "react";
import { birthdayData } from "../data/birthdayData";
import Lightbox from "./Lightbox.jsx";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = birthdayData.gallery;
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const current = useMemo(() => images[idx], [images, idx]);

  const openAt = (i) => { setIdx(i); setOpen(true); };
  const close = () => setOpen(false);
  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);
  const next = () => setIdx((v) => (v + 1) % images.length);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="h2">Gallery 📸</h2>
          <p className="p">Tap any photo to open it.</p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: 16 }}>
          {images.map((img, i) => (
            <motion.button
              key={i}
              className="card"
              onClick={() => openAt(i)}
              style={{ padding: 0, cursor: "pointer", overflow: "hidden" }}
              title="Open"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <img src={img.src} alt={img.caption} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
              <div style={{ padding: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{img.caption}</div>
            </motion.button>
          ))}
        </div>

        <Lightbox open={open} image={current} onClose={close} onPrev={prev} onNext={next} />
      </div>
    </section>
  );
}
