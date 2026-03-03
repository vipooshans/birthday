import { birthdayData } from "../data/birthdayData";
import { motion } from "framer-motion";
import Balloons from "./Balloons.jsx";
import CakeCandle from "./CakeCandle.jsx";

export default function Hero() {
  const { hero, person } = birthdayData;

  return (
    <section className="section" id="top">
      <div className="container">
        <motion.div
          className="card glowPulse"
          style={{ overflow: "hidden", padding: 0, position: "relative" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Balloons count={14} />
          <div className="heroGrid">
            <div style={{ padding: 22 }}>
              <span className="badge">{hero.badge}</span>
              <h1 style={{ fontSize: 44, margin: "12px 0 6px" }}>
                {hero.title} {person.nickname ? `, ${person.nickname}` : ""} 🎈
              </h1>
              <motion.div
                className="welcome22"
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                Welcome to <span className="welcome22Num">22</span> ✨
              </motion.div>
              <p className="p" style={{ fontSize: 16 }}>
                {hero.subtitle}
              </p>

              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                <span className="badge">📅 {person.birthdayDateText}</span>
                <span className="badge">✨ You are deeply appreciated</span>
                <a className="btn" href="#gallery">Open Gallery</a>
              </div>

              <div style={{ marginTop: 18 }}>
                <CakeCandle />
              </div>
            </div>

            <div className="heroProfilePanel">
              <img
                className="heroProfileImg floaty"
                src={hero.image}
                alt={`${person.nickname || person.name} photo`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
