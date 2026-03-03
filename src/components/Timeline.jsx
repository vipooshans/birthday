import { birthdayData } from "../data/birthdayData";
import { motion } from "framer-motion";

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="h2">Notable Moments ✨</h2>
          <p className="p">A mini timeline + fun facts.</p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "1.2fr 0.8fr", marginTop: 16 }}>
          <div className="card">
            <div style={{ display: "grid", gap: 12 }}>
              {birthdayData.timeline.map((t, i) => (
                <motion.div
                  key={i}
                  className="card"
                  style={{ borderRadius: 14 }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="badge">{t.year}</div>
                  <div style={{ fontWeight: 800, marginTop: 10 }}>{t.title}</div>
                  <div className="p" style={{ marginTop: 6 }}>{t.text}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Fun Facts 💫</div>
            <div style={{ display: "grid", gap: 10 }}>
              {birthdayData.funFacts.map((f, i) => (
                <motion.div
                  key={i}
                  className="card"
                  style={{ borderRadius: 14 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {f}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
