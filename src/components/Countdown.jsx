import { useEffect, useMemo, useState } from "react";
import { birthdayData } from "../data/birthdayData";
import { motion } from "framer-motion";

function pad(n) {
  return String(n).padStart(2, "0");
}

function getNextBirthdayTarget({ month, day, time }) {
  const [hh, mm] = (time || "00:00").split(":").map(Number);
  const now = new Date();

  let year = now.getFullYear();
  let target = new Date(year, month - 1, day, hh || 0, mm || 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    year += 1;
    target = new Date(year, month - 1, day, hh || 0, mm || 0, 0, 0);
  }
  return target;
}

function diffParts(ms) {
  const total = Math.max(0, ms);
  const sec = Math.floor(total / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  return { days, hours, mins, secs };
}

function TimeBox({ label, value }) {
  return (
    <motion.div
      className="card floaty"
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ borderRadius: 16, padding: 14, minWidth: 86, textAlign: "center" }}
    >
      <div style={{ fontSize: 22, fontWeight: 900 }}>{value}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{label}</div>
    </motion.div>
  );
}

export default function Countdown() {
  const cfg = birthdayData.countdown;
  const target = useMemo(() => getNextBirthdayTarget(cfg), [cfg.month, cfg.day, cfg.time]);
  const [remaining, setRemaining] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const { days, hours, mins, secs } = diffParts(remaining);
  const isNow = remaining <= 0;

  return (
    <section className="section" id="countdown">
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <h2 className="h2" style={{ marginBottom: 6 }}>⏳ {cfg.label}</h2>
              <p className="p" style={{ marginTop: 0 }}>
                Target:
                <span className="badge" style={{ marginLeft: 8 }}>
                  {target.toLocaleString()}
                </span>
              </p>
            </div>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}
            >
              {isNow ? (
                <div className="badge" style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>
                  🎉 It’s Birthday Time! 🎂
                </div>
              ) : (
                <>
                  <TimeBox label="Days" value={String(days)} />
                  <TimeBox label="Hours" value={pad(hours)} />
                  <TimeBox label="Minutes" value={pad(mins)} />
                  <TimeBox label="Seconds" value={pad(secs)} />
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
