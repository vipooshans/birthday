import { useMemo } from "react";

function pseudoRand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Balloons({ count = 12 }) {
  const balloons = useMemo(() => {
    const emojis = ["🎈", "🎈", "🎈", "🎈"];

    return Array.from({ length: count }, (_, i) => {
      const r1 = pseudoRand(i + 1);
      const r2 = pseudoRand((i + 1) * 7.7);
      const r3 = pseudoRand((i + 1) * 13.3);

      return {
        id: `balloon-${i}`,
        left: Math.round(r1 * 96), // 0..96%
        delay: +(r2 * 3.5).toFixed(2), // 0..3.5s
        duration: +(7.5 + r3 * 5.5).toFixed(2), // 7.5..13s
        size: Math.round(22 + r2 * 22), // 22..44px
        emoji: emojis[i % emojis.length],
      };
    });
  }, [count]);

  return (
    <div className="balloonLayer" aria-hidden="true">
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            fontSize: `${b.size}px`,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}
