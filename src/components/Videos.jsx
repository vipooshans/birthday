import { birthdayData } from "../data/birthdayData";
import { motion } from "framer-motion";

export default function Videos() {
  return (
    <section id="videos" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="h2">Videos 🎬</h2>
          <p className="p">Little clips that feel like time travel.</p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", marginTop: 16 }}>
          {birthdayData.videos.map((v, idx) => (
            <motion.div
              className="card"
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div style={{ fontWeight: 700 }}>{v.title}</div>
              <div className="p" style={{ margin: "6px 0 10px" }}>{v.description}</div>
              <video controls style={{ width: "100%", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)" }}>
                <source src={v.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
