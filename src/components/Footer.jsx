import { birthdayData } from "../data/birthdayData";

export default function Footer() {
  return (
    <footer style={{ padding: "30px 0 44px" }}>
      <div className="container">
        <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 800 }}>Made with 💛</div>
            <div className="p">For {birthdayData.person.name}</div>
          </div>
          <a
            className="btn"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ⬆
          </a>
        </div>
      </div>
    </footer>
  );
}
