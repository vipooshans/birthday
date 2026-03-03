import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MessageWall() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("birthday_messages") || "[]");
    setMessages(saved);
  }, []);

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem("birthday_messages", JSON.stringify(newMessages));
  };

  const addMessage = () => {
    if (!message.trim()) return;

    const newEntry = {
      id: crypto.randomUUID(),
      name: name.trim() || "Anonymous",
      message: message.trim(),
      time: new Date().toLocaleString(),
    };

    saveMessages([newEntry, ...messages]);
    setMessage("");
    setName("");
  };

  const clearAll = () => {
    localStorage.removeItem("birthday_messages");
    setMessages([]);
  };

  return (
    <section className="section" id="messages">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="h2">Message Wall 💌</h2>
          <p className="p">Write something sweet and make it memorable.</p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
          <div className="card">
            <label style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vipooshan"
              style={{
                width: "100%",
                marginTop: 8,
                padding: 12,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                outline: "none",
              }}
            />

            <label style={{ fontSize: 14, marginTop: 14, display: "block", color: "rgba(255,255,255,0.75)" }}>
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your birthday wish..."
              rows={5}
              style={{
                width: "100%",
                marginTop: 8,
                padding: 12,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                outline: "none",
                resize: "vertical",
              }}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <button className="btn" onClick={addMessage}>Add Message ✅</button>
              <button className="btn" onClick={clearAll}>Clear All 🗑</button>
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Recent Wishes ✨</div>

            {messages.length === 0 ? (
              <p className="p">No messages yet. Be the first 💛</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    className="card"
                    style={{ borderRadius: 14 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{m.time}</div>
                    </div>
                    <div style={{ marginTop: 8, color: "rgba(255,255,255,0.80)" }}>{m.message}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
