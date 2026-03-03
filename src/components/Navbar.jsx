import { birthdayData } from "../data/birthdayData";

export default function Navbar() {
  const { name } = birthdayData.person;

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(10px)" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.10)", background: "rgba(11,15,25,0.55)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
          <div style={{ fontWeight: 700 }}>🎂 {name}</div>
          <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.75)", fontSize: 14, flexWrap: "wrap" }}>
            <a href="#countdown">Countdown</a>
            <a href="#favorites">Favorites</a>
            <a href="#music">Music</a>
            <a href="#gallery">Gallery</a>
            <a href="#videos">Videos</a>
            <a href="#timeline">Timeline</a>
            <a href="#messages">Messages</a>
          </div>
        </div>
      </div>
    </div>
  );
}
