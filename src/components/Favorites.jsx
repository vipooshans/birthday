import { birthdayData } from "../data/birthdayData";
import { motion } from "framer-motion";

export default function Favorites() {
  return (
    <section id="favorites" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="h2">Favorite Things 💛</h2>
          <p className="p">A few things that make you, you.</p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", marginTop: 16 }}>
          {birthdayData.favorites.map((f, idx) => (
            <motion.div
              className="card"
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{ borderRadius: 18 }}
            >
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.70)" }}>{f.title}</div>
              <div style={{ fontSize: 20, fontWeight: 700, margin: "8px 0 6px" }}>{f.value}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.70)" }}>{f.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
