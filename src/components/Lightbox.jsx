import { motion } from "framer-motion";

export default function Lightbox({ open, image, onClose, onPrev, onNext }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
        padding: 18,
      }}
    >
      <motion.div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(980px, 96%)", padding: 12 }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ color: "rgba(255,255,255,0.80)", fontSize: 14 }}>{image?.caption}</div>
          <button className="btn" onClick={onClose}>Close ✖</button>
        </div>

        <div style={{ marginTop: 10, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)" }}>
          <img src={image?.src} alt={image?.caption || "gallery"} style={{ width: "100%", display: "block" }} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
          <button className="btn" onClick={onPrev}>⬅ Prev</button>
          <button className="btn" onClick={onNext}>Next ➡</button>
        </div>
      </motion.div>
    </div>
  );
}
